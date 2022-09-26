import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { LayersControlEvent } from "leaflet";
import { compact, differenceBy, find, head, isEmpty, last, set, sortBy } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { MapOrgUnit } from "../../../../interfaces";
import { MapLayersContext } from "../../../../state";
import { defaultClasses, defaultColorScaleName } from "../../../../utils/colors";
import { generateLegends, getOrgUnitsSelection, sanitizeDate } from "../../../../utils/map";
import { CustomBoundaryLayer, CustomMapLayer, CustomPointLayer, CustomThematicLayer, CustomThematicPrimitiveLayer } from "../../../MapLayer/interfaces";
import { useMapOrganisationUnit, useMapPeriods } from "../../hooks";

const analyticsQuery = {
  analytics: {
    resource: "analytics",
    params: ({ ou, pe, dx, startDate, endDate }: any) => {
      const peDimension = !isEmpty(pe) ? `pe:${pe?.join(";")}` : undefined;
      const ouDimension = !isEmpty(ou) ? `ou:${ou?.join(";")}` : undefined;
      const dxDimension = !isEmpty(dx) ? `dx:${dx?.join(";")}` : undefined;

      return {
        dimension: compact([dxDimension, peDimension, ouDimension]),
        startDate,
        endDate,
        displayProperty: "NAME",
      };
    },
  },
};

export function MapLayersProvider({
  layers,
  children,
}: {
  layers: Array<CustomThematicPrimitiveLayer | CustomBoundaryLayer | CustomPointLayer>;
  children: React.ReactNode;
}) {
  const [updatedLayers, setUpdatedLayers] = useState<Array<CustomThematicLayer | CustomBoundaryLayer>>([]);
  const { orgUnits, orgUnitSelection } = useMapOrganisationUnit();
  const { periods } = useMapPeriods() ?? {};
  useMapEvents({
    overlayremove: (event) => {
      setupLayerListeners("remove", event);
    },
    overlayadd: (event) => {
      setupLayerListeners("add", event);
    },
  });

  const ou = useMemo(() => getOrgUnitsSelection(orgUnitSelection), [orgUnitSelection]);
  const pe = useMemo(() => periods?.map((pe: any) => pe.id), [periods]);

  const { startDate, endDate } = useMemo(() => {
    const period = head(periods);
    if (period?.type !== "RANGE" || !isEmpty(periods)) {
      return {
        startDate: undefined,
        endDate: undefined,
      };
    }
    return {
      startDate: sanitizeDate(period.startDate),
      endDate: sanitizeDate(period.endDate),
    };
  }, [periods]);
  const { loading, error, refetch } = useDataQuery(analyticsQuery, {
    variables: {
      ou,
      pe,
      startDate,
      endDate,
    },
    lazy: true,
  });

  const sanitizeData = (data: any, layer: CustomThematicLayer) => {
    if (data) {
      const { analytics } = data as any;
      const rows = analytics?.rows;
      const ouIndex = analytics.headers.findIndex((header: any) => header.name === "ou");
      const dxIndex = analytics.headers.findIndex((header: any) => header.name === "dx");
      const valueIndex = analytics.headers.findIndex((header: any) => header.name === "value");

      if (!isEmpty(rows)) {
        return sortBy(
          orgUnits?.map((ou: MapOrgUnit) => {
            const row = rows.find((row: any) => row[ouIndex] === ou.id && row[dxIndex] === layer.dataItem.id);
            return {
              orgUnit: ou,
              data: row ? parseFloat(row[valueIndex]) : undefined,
              dataItem: {
                ...layer.dataItem,
              },
            };
          }),
          ["data"]
        );
      }
      return [];
    }
    return [];
  };

  const sanitizeLayers = async () => {
    const dataLayers: CustomThematicLayer[] = layers?.filter((layer) => ["bubble", "choropleth"].includes(layer.type)) as unknown as CustomThematicLayer[];
    const otherLayers = differenceBy(layers, dataLayers, "id");
    const layersWithoutData = dataLayers?.filter((layer) => !layer.data);
    const layersWithData = differenceBy(dataLayers, layersWithoutData, "id");
    const dx = layersWithoutData.map((layer) => layer.dataItem.id);
    let sanitizedLayersWithData: any = [];

    if (!isEmpty(dx)) {
      const data = await refetch({
        dx,
      });
      sanitizedLayersWithData = layersWithoutData.map((layer) => ({
        ...layer,
        name: layer?.name ?? layer?.dataItem?.displayName ?? layer.id,
        data: sanitizeData(data, layer),
      }));
    }
    const sanitizedLayersWithOrgUnits = layersWithData.map((layer) => ({
      ...layer,
      data: layer.data?.map((datum) => ({
        ...datum,
        orgUnit: find(orgUnits, ["id", datum.orgUnit]) as MapOrgUnit,
        dataItem: layer.dataItem,
        name: layer?.name ?? layer?.dataItem?.displayName ?? layer.id,
      })),
    }));
    const sanitizedThematicLayers: CustomThematicLayer[] = sanitizeLegends([...sanitizedLayersWithData, ...sanitizedLayersWithOrgUnits]);
    setUpdatedLayers([...(otherLayers as any), ...sanitizedThematicLayers]);
  };

  const updateLayer = useCallback((id: string, updatedLayer: CustomMapLayer) => {
    setUpdatedLayers((prevLayers) => {
      const updatedLayers = [...prevLayers];
      const layerIndex = updatedLayers.findIndex((layer) => layer.id === updatedLayer.id);
      if (layerIndex < 0) {
        return prevLayers;
      }
      set(updatedLayers, layerIndex, updatedLayer);
      return updatedLayers;
    });
  }, []);

  useEffect(() => {
    sanitizeLayers();
  }, []);

  const sanitizeLegends = (layers: CustomThematicLayer[]) => {
    return layers.map((layer) => {
      const legends = [];
      if (layer.dataItem.legendSet) {
        legends.push(...layer.dataItem.legendSet.legends);
      } else {
        const { scale, colorClass } = layer.dataItem.legendConfig ?? {
          scale: defaultClasses,
          colorClass: defaultColorScaleName,
        };
        const sortedData = sortBy(layer.data, "data");
        const autoLegends = generateLegends(last(sortedData)?.data ?? 0, head(sortedData)?.data ?? 0, {
          classesCount: scale,
          colorClass,
        });
        legends.push(...autoLegends);
      }
      return {
        ...layer,
        legends,
      };
    });
  };

  const setupLayerListeners = (type: "add" | "remove", event: LayersControlEvent) => {
    const name = event.name;

    const layerConfig = find(updatedLayers, (layer: any) => {
      const nameFromConfig = layer?.name ?? layer?.dataItem?.displayname ?? layer.id;
      return nameFromConfig === name;
    });

    if (layerConfig) {
      updateLayer(layerConfig.id, { ...layerConfig, enabled: type === "add" });
    }
  };

  if (loading) {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <CenteredContent>
          <CircularLoader small />
        </CenteredContent>
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <CenteredContent>
          <h4>
            {i18n.t("Error")}: {error.message}
          </h4>
        </CenteredContent>
      </div>
    );
  }
  return <MapLayersContext.Provider value={{ layers: updatedLayers, updateLayer }}>{children}</MapLayersContext.Provider>;
}
