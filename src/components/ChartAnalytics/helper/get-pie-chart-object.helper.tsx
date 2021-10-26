import { assign, clone } from "lodash";
import { getChartAxisItems } from "./get-chart-axis-items.helper";
import { getChartSeries } from "./get-chart-series.helper";
import { getDrilldownedChartSeries } from "./get-drilldowned-chart-series.helper";

export function getPieChartObject(
  initialChartObject:any,
  analyticsObject:any,
  chartConfiguration:any
) {
  const newChartObject = clone(initialChartObject);
  const yAxisSeriesItems = getChartAxisItems(
    analyticsObject,
    chartConfiguration.yAxisType
  );

  /**
   * Sort the corresponding series
   */
  const sortedSeries = getSortedChartSeries(
    getChartSeries(
      analyticsObject,
      getChartAxisItems(analyticsObject, chartConfiguration.xAxisType, true),
      yAxisSeriesItems,
      chartConfiguration
    ),
    chartConfiguration.sortOrder
  );

  const sanitizedSeries = sortedSeries.map((series:any) => {
    series.data = series.data.map((dataObject:any) => {
      if (dataObject.y === null) {
        dataObject.y = 0;
      }
      return dataObject;
    });
    return series;
  });

  if (yAxisSeriesItems.length > 1) {
    /**
     * Get parent series for drill down
     * @type {{name: string; colorByPoint: boolean; data: any}[]}
     */
    newChartObject.series = getDrilldownedChartSeries(
      sanitizedSeries,
      yAxisSeriesItems,
      chartConfiguration.yAxisType
    );

    /**
     * Get drill down series
     * @type {{series: any}}
     */
    newChartObject.drilldown = {
      series: sanitizedSeries,
    };
  } else {
    /**
     * Get series
     */
    newChartObject.series = assign([], sanitizedSeries);
  }

  return newChartObject;
}
