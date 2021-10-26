/* eslint-disable max-params */
import { find, findIndex, map } from "lodash";
import { getChartSeriesDataLabelsOptions } from "./get-chart-series-data-label-options.helper";

export function getChartSeriesData(
  analyticsObject:any,
  chartConfiguration:any,
  yAxisItemId:string,
  xAxisItems:any[]
) {
  const data:Array<any> = [];

  /**
   * Get index to locate data for y axis
   */
  const yAxisItemIndex = findIndex(
    analyticsObject.headers,
    find(analyticsObject.headers, ["name", chartConfiguration.yAxisType])
  );

  /**
   * Get index for value attribute to get the data
   */
  const dataIndex = findIndex(
    analyticsObject.headers,
    find(analyticsObject.headers, ["name", "value"])
  );

  /**
   * Get index to locate data for x axis
   */
  const xAxisItemIndex = map(chartConfiguration.xAxisType, (xAxisType) => {
    return findIndex(
      analyticsObject.headers,
      find(analyticsObject.headers, ["name", xAxisType])
    );
  }).join("_");

  if (xAxisItems) {
    xAxisItems.forEach((xAxisItem) => {
      /**
       * Get the required data depending on xAxis and yAxis
       */
      //getChartSeriesValue
      const seriesValue = getChartSeriesValue(
        analyticsObject.rows,
        yAxisItemIndex,
        yAxisItemId,
        xAxisItemIndex,
        xAxisItem.id,
        dataIndex
      );

      data.push({
        id: xAxisItem.id,
        name: xAxisItem.name,
        dataLabels: getChartSeriesDataLabelsOptions(chartConfiguration),
        y: seriesValue,
      });
    });
  }
  return data;
}
