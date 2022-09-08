import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { compact, differenceBy, find, head, isEmpty, sortBy } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { MapOrgUnit, MapProviderProps } from "../../interfaces";
import { MapLayersContext, MapOrgUnitContext, MapPeriodContext } from "../../state";
import { getOrgUnitsSelection, sanitizeDate, sanitizeOrgUnits, toGeoJson } from "../../utils/map";
import { CustomBoundaryLayer, CustomThematicLayer, CustomThematicPrimitiveLayer } from "../MapLayer/interfaces";
import { useMapOrganisationUnit, useMapPeriods } from "./hooks";

const boundaryQuery = {
  boundaries: {
    resource: "geoFeatures",
    params: ({ orgUnitIds }: any) => ({
      ou: `ou:${orgUnitIds?.join(";")}`,
    }),
  },
  analytics: {
    resource: "analytics",
    params: ({ orgUnitIds }: any) => ({
      dimension: [`ou:${orgUnitIds.join(";")}`, `pe:${new Date().getFullYear()}`],
      skipData: true,
      hierarchyMeta: true,
    }),
  },
};

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

function MapLayersProvider({ layers, children }: { layers: Array<CustomThematicPrimitiveLayer | CustomBoundaryLayer>; children: React.ReactNode }) {
  const [updatedLayers, setUpdatedLayers] = useState(layers);
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
        data: sanitizeData(data, layer),
      }));
    }
    const sanitizedLayersWithOrgUnits = layersWithData.map((layer) => ({
      ...layer,
      data: layer.data?.map((datum) => ({
        ...datum,
        orgUnit: find(orgUnits, ["id", datum.orgUnit]) as MapOrgUnit,
        dataItem: layer.dataItem,
      })),
    }));
    setUpdatedLayers([...otherLayers, ...sanitizedLayersWithData, ...sanitizedLayersWithOrgUnits]);
  };

  useEffect(() => {
    sanitizeLayers();
  }, []);

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

  return <MapLayersContext.Provider value={{ layers: updatedLayers }}>{children}</MapLayersContext.Provider>;
}

export function MapProvider({ children, orgUnitSelection, periodSelection, layers }: MapProviderProps) {
  const [orgUnits, setOrgUnits] = useState<MapOrgUnit[]>([]);
  const { refetch, loading, error } = useDataQuery(boundaryQuery, { lazy: true });

  useEffect(() => {
    async function getOrgUnits() {
      const rawOrgUnitIds = getOrgUnitsSelection(orgUnitSelection);
      const data = await refetch({ orgUnitIds: rawOrgUnitIds });
      const { analytics, boundaries } = (data as any) ?? {};
      const rawOrgUnits = sanitizeOrgUnits(analytics?.metaData);
      const geoJSONObjects = toGeoJson(boundaries.filter((bound: any) => bound.co));
      const orgUnits: MapOrgUnit[] = compact(
        rawOrgUnits.map((orgUnit: any) => {
          const geoJSONObject: any = geoJSONObjects?.find((geoJSON: any) => geoJSON.properties.id === orgUnit.id);

          if (!geoJSONObject) {
            return;
          }
          return {
            ...orgUnit,
            geoJSON: geoJSONObject,
            bounds: [],
            level: geoJSONObject.properties.level,
          };
        })
      );
      setOrgUnits(orgUnits);
    }

    getOrgUnits();
  }, [orgUnitSelection, refetch]);

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
  if (!isEmpty(orgUnits)) {
    return (
      <MapOrgUnitContext.Provider value={{ orgUnitSelection, orgUnits }}>
        <MapPeriodContext.Provider value={periodSelection}>
          <MapLayersProvider layers={layers ?? []}>{children}</MapLayersProvider>
        </MapPeriodContext.Provider>
      </MapOrgUnitContext.Provider>
    );
  }

  return null;
}
