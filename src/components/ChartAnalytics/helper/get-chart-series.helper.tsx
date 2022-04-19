import { getAllowedChartType } from "./get-allowed-chart-types.helper";
import { getChartSeriesData } from "./get-chart-series-data.helper";

export function getChartSeries({
  analyticsObject,
  chartConfiguration,
  xAxisItems,
  yAxisItems,
}: {
  analyticsObject: any;
  xAxisItems: any[];
  yAxisItems: any[];
  chartConfiguration: any;
}) {
  return yAxisItems.map((yAxisItem, yAxisIndex) => {
    return {
      name: yAxisItem.name,
      id: yAxisItem.id,
      index: yAxisIndex,
      turboThreshold: 0,
      pointPlacement: chartConfiguration.type === "radar" ? "on" : undefined,

      data: getChartSeriesData({ analyticsObject, chartConfiguration, yAxisItemId: yAxisItem.id, xAxisItems }),
      type: getAllowedChartType(chartConfiguration.type),
    };
  });
}
