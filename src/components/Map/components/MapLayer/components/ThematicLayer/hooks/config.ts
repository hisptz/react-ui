import { useDataQuery } from "@dhis2/app-runtime";
import { isEmpty } from "lodash";
import { useEffect, useMemo } from "react";
import { MapOrgUnit } from "../../../../../interfaces";
import { getOrgUnitsSelection } from "../../../../../utils/map";
import { useMapOrganisationUnit, useMapPeriods } from "../../../../MapProvider/hooks";
import { ThematicLayer, ThematicLayerData } from "../../../interfaces";

const analyticsQuery = {
  analytics: {
    resource: "analytics",
    params: ({ ou, pe, dx }: any) => ({
      dimension: [`ou:${ou.join(";")}`, `pe:${pe.join(";")}`, `dx:${dx.join(";")}`],
    }),
  },
  legendSet: {
    resource: "legendSets",
    id: ({ legendSetId }: any) => legendSetId,
    params: () => ({
      fields: ["id", "name", "legends[id,name,startValue,endValue,color]"],
    }),
  },
};

export default function useThematicLayerData(layer: ThematicLayer): {
  data: ThematicLayerData[];
  loading: boolean;
  error?: any;
} {
  const { orgUnits, orgUnitSelection } = useMapOrganisationUnit();
  const { periods } = useMapPeriods() ?? {};
  const ou = useMemo(() => getOrgUnitsSelection(orgUnitSelection), [orgUnitSelection]);
  const pe = useMemo(() => periods?.map((pe: any) => pe.id), [periods]);
  const dx = useMemo(() => [layer.dataItem.id], [layer]);

  const { loading, data, error, refetch } = useDataQuery(analyticsQuery, {
    variables: {
      ou,
      pe,
      dx,
      legendSetId: layer?.dataItem?.legendSet?.id,
    },
    lazy: true,
  });

  useEffect(() => {
    refetch({
      ou,
      pe,
      dx,
      legendSetId: layer?.dataItem?.legendSet?.id,
    });
  }, [ou, pe, dx]);

  const formattedData = useMemo(() => {
    if (data) {
      const { analytics } = data as any;
      const rows = analytics?.rows;
      const ouIndex = analytics.headers.findIndex((header: any) => header.name === "ou");
      const valueIndex = analytics.headers.findIndex((header: any) => header.name === "value");
      if (!isEmpty(rows)) {
        return orgUnits?.map((ou: MapOrgUnit) => {
          const row = rows.find((row: any) => row[ouIndex] === ou.id);
          return {
            orgUnit: ou,
            data: row ? parseFloat(row[valueIndex]) : undefined,
            dataItem: {
              ...layer.dataItem,
              legendSet: Array.isArray((data?.legendSet as any)?.legendSets) ? (data.legendSet as any)?.legendSets[0] : data.legendSet,
            },
          };
        });
      }
      return [];
    }
    return [];
  }, [data, orgUnits, periods, layer]);

  return {
    data: formattedData as any,
    loading,
    error,
  };
}
