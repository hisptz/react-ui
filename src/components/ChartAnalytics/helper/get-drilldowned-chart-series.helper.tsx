import { map } from "lodash";
import { getDrilldownParentDataFromChildrenSeries } from "./get-drilldown-parent-data-from-children-chart-series.helper";

export function getDrilldownedChartSeries(
  drilldownSeries:any[],
  yAxisItems:any[],
  parentType:string
) {
  // todo find readable names for parent types that are not data, period or organisation unit
  const seriesName =
    parentType === "pe"
      ? "Period"
      : parentType === "dx"
      ? "Data"
      : parentType === "ou"
      ? "Organisation unit"
      : "Categories";

  const seriesData = map(yAxisItems, (yAxisObject) => {
    return {
      name: yAxisObject.name,
      drilldown: yAxisObject.id,
      y: getDrilldownParentDataFromChildrenSeries(
        drilldownSeries,
        yAxisObject.id
      ),
    };
  });

  const newSeriesObject = {
    name: seriesName,
    colorByPoint: true,
    data: seriesData,
  };
  return [newSeriesObject];
}
