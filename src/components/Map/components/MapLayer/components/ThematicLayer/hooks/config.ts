import { useDataQuery } from "@dhis2/app-runtime";
import { compact, head, isEmpty, sortBy } from "lodash";
import { useEffect, useMemo } from "react";
import { MapOrgUnit } from "../../../../../interfaces";
import { getOrgUnitsSelection, sanitizeDate } from "../../../../../utils/map";
import { useMapOrganisationUnit, useMapPeriods } from "../../../../MapProvider/hooks";
import { ThematicLayer, ThematicLayerData } from "../../../interfaces";

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
      startDate,
      endDate,
    });
  }, [ou, pe, dx]);

  const formattedData = useMemo(() => {
    if (data) {
      const { analytics } = data as any;
      const rows = analytics?.rows;
      const ouIndex = analytics.headers.findIndex((header: any) => header.name === "ou");
      const valueIndex = analytics.headers.findIndex((header: any) => header.name === "value");
      if (!isEmpty(rows)) {
        return sortBy(
          orgUnits?.map((ou: MapOrgUnit) => {
            const row = rows.find((row: any) => row[ouIndex] === ou.id);
            return {
              orgUnit: ou,
              data: row ? parseFloat(row[valueIndex]) : undefined,
              dataItem: {
                ...layer.dataItem,
                legendSet: Array.isArray((data?.legendSet as any)?.legendSets) ? (data.legendSet as any)?.legendSets[0] : data.legendSet,
              },
            };
          }),
          ["data"]
        );
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
