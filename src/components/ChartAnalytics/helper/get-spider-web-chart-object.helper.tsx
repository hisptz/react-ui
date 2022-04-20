import { assign, clone } from "lodash";
import { getChartAxisItems } from "./get-chart-axis-items.helper";
import { getChartPaneOptions } from "./get-chart-pane-options.helper";
import { getChartSeries } from "./get-chart-series.helper";
import { getChartXAxisOptions } from "./get-chart-x-axis-options.helper";
import { getChartYAxisOptions } from "./get-chart-y-axis-options.helper";
import { getSanitizedChartXAxisCategories } from "./get-sanitized-chart-x-axis-categories.helper";
import { getSortedChartSeries } from "./get-sorted-chart-series.helper";
import { getXAxisItemsFromChartConfiguration } from "./get-x-axis-items-from-chart-configuration.helper";

export function getSpiderWebChartObject(initialChartObject: any, analyticsObject: any, chartConfiguration: any) {
  //getChartAxisItems
  const newChartObject = clone(initialChartObject);
  const yAxisSeriesItems: any[] = getChartAxisItems(analyticsObject, chartConfiguration.yAxisType);

  /**
   * Get pane attribute
   */
  newChartObject.pane = assign({}, getChartPaneOptions(chartConfiguration.type));

  /**
   * Get y axis options
   */
  newChartObject.yAxis = assign([], getChartYAxisOptions(chartConfiguration));

  /**
   * Sort the corresponding series
   * getChartSeries
   */
  const sortedSeries = getSortedChartSeries(
    getChartSeries({
      analyticsObject,
      xAxisItems: getChartAxisItems(analyticsObject, chartConfiguration.xAxisType),
      yAxisItems: yAxisSeriesItems,
      chartConfiguration,
    }),
    chartConfiguration.cumulativeValues ? -1 : chartConfiguration.sortOrder
  );

  /**
   *  Get series
   *
   */

  newChartObject.series = assign([], sortedSeries);

  const xAxisItems = getXAxisItemsFromChartConfiguration(chartConfiguration);

  /**
   *
   *   Get refined x axis options
   */
  newChartObject.xAxis = getChartXAxisOptions(
    getSanitizedChartXAxisCategories(newChartObject.series, xAxisItems),

    chartConfiguration
  );
  return newChartObject;
}
