import { compact, differenceBy, find, head, isEmpty, last, sortBy } from "lodash";
import { useMapOrganisationUnit, useMapPeriods } from "../../../hooks";
import { useCallback, useMemo } from "react";
import { generateLegends, getOrgUnitsSelection, sanitizeDate, sanitizeOrgUnits, toGeoJson } from "../../../../../utils/map";
import { useDataQuery } from "@dhis2/app-runtime";
import { CustomGoogleEngineLayer, CustomPointLayer, CustomThematicLayer, CustomThematicPrimitiveLayer } from "../../../../MapLayer/interfaces";
import { MapOrgUnit, PointOrgUnit } from "../../../../../interfaces";
import { asyncify, map } from "async-es";
import { LegendSet } from "@hisptz/dhis2-utils";
import { defaultClasses, defaultColorScaleName } from "../../../../../utils/colors";
import { useGoogleEngineToken } from "../../../../MapLayer/components/GoogleEngineLayer/hooks";
import { useBoundaryData } from "../../../../MapLayer/components/BoundaryLayer/hooks/useBoundaryData";
import { EarthEngine } from "../../../../MapLayer/components/GoogleEngineLayer/services/engine";
import { EARTH_ENGINE_LAYERS } from "../../../../MapLayer/components/GoogleEngineLayer/constants";
import { EarthEngineOptions } from "../../../../MapLayer/components/GoogleEngineLayer/interfaces";

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

export function useThematicLayers(): any {
  const { orgUnits, orgUnitSelection } = useMapOrganisationUnit();
  const { periods, range } = useMapPeriods() ?? {};
  const ou = useMemo(() => getOrgUnitsSelection(orgUnitSelection), [orgUnitSelection]);
  const pe = useMemo(() => periods?.map((pe: any) => pe.id), [periods]);

  const { startDate, endDate } = useMemo(() => {
    if (!range) {
      return {
        startDate: undefined,
        endDate: undefined,
      };
    }
    return {
      startDate: sanitizeDate(range.start.toDateString()),
      endDate: sanitizeDate(range.end.toDateString()),
    };
  }, [range]);
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

export function usePointLayer() {
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

export function useGoogleEngineLayers() {
  const { refresh } = useGoogleEngineToken();
  const orgUnits = useBoundaryData();

  async function getImageUrl(earthEngine: EarthEngine, { filters }: CustomGoogleEngineLayer): Promise<string | undefined> {
    if (earthEngine.initialized) {
      try {
        earthEngine.setOrgUnits(orgUnits ?? []);
        const period = filters?.period;
        if (period) {
          earthEngine.setPeriod(period);
        }
        return earthEngine.url();
      } catch (e) {
        console.error(e);
      }
    }
  }

  const sanitizeLayers = useCallback(
    async (layers: CustomGoogleEngineLayer[]): Promise<CustomGoogleEngineLayer[]> => {
      const { token } = await refresh();
      await EarthEngine.setToken(token, refresh);
      return map(
        layers,
        asyncify(async (layer: CustomGoogleEngineLayer) => {
          const defaultOptions: any = find(EARTH_ENGINE_LAYERS, ["id", layer.type]) ?? {};
          const options: EarthEngineOptions = {
            ...defaultOptions,
            aggregations: layer.aggregations ?? defaultOptions?.aggregations,
          };
          const updatedLayer = {
            ...layer,
            options,
          };
          const earthEngine = new EarthEngine({ options });
          const url = await getImageUrl(earthEngine, updatedLayer);
          return {
            ...updatedLayer,
            engine: earthEngine,
            url,
          };
        })
      );
    },
    [refresh]
  );

  return {
    sanitizeLayers,
  };
}
