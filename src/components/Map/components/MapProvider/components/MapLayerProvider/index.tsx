import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import type { LegendSet } from "@hisptz/dhis2-utils";
import { asyncify, map } from "async-es";
import { LayersControlEvent } from "leaflet";
import { compact, differenceBy, find, groupBy, head, isEmpty, last, set, sortBy } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { MapOrgUnit, PointOrgUnit } from "../../../../interfaces";
import { MapLayersContext } from "../../../../state";
import { defaultClasses, defaultColorScaleName } from "../../../../utils/colors";
import { generateLegends, getOrgUnitsSelection, sanitizeDate, sanitizeOrgUnits, toGeoJson } from "../../../../utils/map";
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

const query = {
  layer: {
    resource: "geoFeatures",
    params: ({ ous }: any) => ({
      ou: `ou:${ous.join(";")}`,
    }),
  },
  analytics: {
    resource: "analytics",
    params: ({ ous }: any) => ({
      dimension: [`ou:${ous.join(";")}`, `pe:${new Date().getFullYear()}`],
      skipData: true,
      hierarchyMeta: true,
    }),
  },
};

const groupSetQuery = {
  groupSet: {
    resource: "organisationUnitGroupSets",
    id: ({ groupSet }: any) => groupSet,
    params: {
      fields: ["organisationUnitGroups[name,color,symbol,organisationUnits[id]]"],
    },
  },
};

const legendSetsQuery = {
  legendSets: {
    resource: "legendSets",
    id: ({ id }: any) => id,
    params: {
      fields: ["id", "displayName", "legends[id,code,startValue,endValue,color]"],
    },
  },
};

function useThematicLayers() {
  const { orgUnits, orgUnitSelection } = useMapOrganisationUnit();
  const { periods } = useMapPeriods() ?? {};
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
  const { loading: loadingLegendSets, refetch: getLegends } = useDataQuery(legendSetsQuery, { lazy: true });

  const sanitizeData = (data: any, layer: CustomThematicPrimitiveLayer) => {
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

  const sanitizeLegends = async (layers: CustomThematicLayer[]): Promise<CustomThematicLayer[]> => {
    return (await map(
      layers,
      asyncify(async (layer: CustomThematicLayer) => {
        const legends = [];
        if (layer.dataItem.legendSet) {
          const legendSetData = await getLegends({ id: layer.dataItem.legendSet });
          const legendSet: LegendSet = legendSetData?.legendSets as LegendSet;
          if (legendSet) {
            legends.push(...legendSet.legends);
          }
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
      })
    )) as CustomThematicLayer[];
  };

  const sanitizeLayers = async (layers: CustomThematicPrimitiveLayer[]): Promise<CustomThematicLayer[]> => {
    const layersWithoutData = layers?.filter((layer) => !layer.data);
    const layersWithData = differenceBy(layers, layersWithoutData, "id");
    const dx = layersWithoutData.map((layer) => layer.dataItem.id);
    let sanitizedLayersWithData: any = [];

    if (!isEmpty(dx)) {
      const data = await refetch({
        dx,
        ou,
        pe,
        startDate,
        endDate,
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
    return await sanitizeLegends([...sanitizedLayersWithData, ...sanitizedLayersWithOrgUnits]);
  };

  return {
    sanitizeLayers,
    loading: loading || loadingLegendSets,
    error,
  };
}

function usePointLayer() {
  const { orgUnitSelection } = useMapOrganisationUnit();
  const { loading, refetch: refetchOrgUnitData } = useDataQuery(query, {
    lazy: true,
  });
  const { loading: groupSetDataLoading, refetch: refetchGroupSetData } = useDataQuery(groupSetQuery, {
    lazy: true,
  });

  const sanitizePointData = useCallback((orgUnitData: any, groupSetData: any): PointOrgUnit[] => {
    const { analytics, layer } = (orgUnitData as any) ?? {};
    const rawOrgUnits = sanitizeOrgUnits(analytics?.metaData);
    const geoJSONObjects = toGeoJson(layer?.filter((bound: any) => bound.co));
    return compact(
      rawOrgUnits.map((orgUnit: any) => {
        const geoJSONObject: any = geoJSONObjects?.find((geoJSON: any) => geoJSON.properties.id === orgUnit.id);
        const orgUnitGroups: any = (groupSetData?.groupSet as any)?.organisationUnitGroups ?? [];
        const ouGroup = find(orgUnitGroups, (ouGroup) => !!find(ouGroup?.organisationUnits ?? [], ["id", orgUnit.id]));

        if (!geoJSONObject || geoJSONObject.properties.type !== "Point") {
          return;
        }
        return {
          ...orgUnit,
          geoJSON: geoJSONObject,
          level: geoJSONObject.properties.level,
          icon: {
            type: "groupIcon",
            icon: ouGroup?.symbol,
          },
        };
      })
    );
  }, []);

  const sanitizeLayer = useCallback(async (layer: CustomPointLayer): Promise<CustomPointLayer | undefined> => {
    if (!layer.level && !layer.group) {
      return;
    }

    const level = layer.level ? `LEVEL-${layer.level}` : undefined;
    const group = layer.group ? `OU_GROUP-${layer.group}` : undefined;
    const ous = [...getOrgUnitsSelection(orgUnitSelection), level, group];

    const pointData = await refetchOrgUnitData({ ous });
    const groupSetData = await refetchGroupSetData({ groupSet: layer.style?.groupSet });
    const sanitizedOrgUnitData = sanitizePointData(pointData, groupSetData);

    const orgUnitGroups = (groupSetData?.groupSet as any)?.organisationUnitGroups ?? [];

    const sanitizedOrgUnitGroups = orgUnitGroups.map((ouGroup: any) => ({ ...ouGroup, organisationUnits: undefined }));

    return {
      ...layer,
      points: sanitizedOrgUnitData,
      style: {
        ...layer.style,
        orgUnitGroups: sanitizedOrgUnitGroups,
      },
    };
  }, []);

  return {
    loading: loading || groupSetDataLoading,
    sanitizeLayer,
  };
}

export function MapLayersProvider({
  layers,
  children,
}: {
  layers: Array<CustomThematicPrimitiveLayer | CustomBoundaryLayer | CustomPointLayer>;
  children: React.ReactNode;
}) {
  const [updatedLayers, setUpdatedLayers] = useState<Array<CustomThematicLayer | CustomBoundaryLayer | CustomPointLayer>>([]);
  const { sanitizeLayers: sanitizeThematicLayers, loading: loadingThematicLayer, error } = useThematicLayers();
  const { sanitizeLayer: sanitizePointLayer, loading: loadingPointLayer } = usePointLayer();
  const loading = useMemo(() => loadingPointLayer || loadingThematicLayer, [loadingPointLayer, loadingThematicLayer]);

  useMapEvents({
    overlayremove: (event) => {
      setupLayerListeners("remove", event);
    },
    overlayadd: (event) => {
      setupLayerListeners("add", event);
    },
  });

  const sanitizeLayers = async () => {
    const { bubble, choropleth, overlay, point } =
      groupBy(layers, "type") ??
      ({
        choropleth: [],
        overlay: [],
        bubble: [],
      } as { choropleth: CustomThematicPrimitiveLayer[]; overlay: CustomBoundaryLayer[]; bubble: CustomThematicPrimitiveLayer[] });
    const sanitizedThematicLayers = await sanitizeThematicLayers([...(bubble ?? []), ...(choropleth ?? [])] as CustomThematicPrimitiveLayer[]);
    const sanitizedBoundaryLayers = (overlay ?? []) as CustomBoundaryLayer[];
    const sanitizedPointLayer = head(point ?? []) ? await sanitizePointLayer(point[0] as CustomPointLayer) : undefined;
    setUpdatedLayers(compact([...(sanitizedBoundaryLayers ?? []), ...(sanitizedThematicLayers ?? []), sanitizedPointLayer]));
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
