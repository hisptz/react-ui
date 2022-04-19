import { filter, map } from "lodash";
import { getChartAxisItems } from "./get-chart-axis-items.helper";
import { getChartSeriesWithAxisOptions } from "./get-chart-series-with-axis-options.helper";
import { getChartSeries } from "./get-chart-series.helper";
import { getChartXAxisOptions } from "./get-chart-x-axis-options.helper";
import { getChartYAxisOptions } from "./get-chart-y-axis-options.helper";
import { getSanitizedChartXAxisCategories } from "./get-sanitized-chart-x-axis-categories.helper";
import { getSortedChartSeries } from "./get-sorted-chart-series.helper";
import { getXAxisItemsFromChartConfiguration } from "./get-x-axis-items-from-chart-configuration.helper";

export function getOtherChartObject({
  initialChartObject,
  analyticsObject,
  chartConfiguration,
}: {
  initialChartObject: any;
  analyticsObject: any;
  chartConfiguration: any;
}) {
  const yAxisSeriesItems: any[] = getChartAxisItems(analyticsObject, [chartConfiguration.yAxisType]);

  /**
   * Sort the corresponding series
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
   * Update series with axis options
   */
  const seriesWithAxisOptions = getChartSeriesWithAxisOptions(sortedSeries, chartConfiguration.multiAxisTypes);

  /**
   * Update colors by considering if series has data
   */
  const newColors = filter(
    map(seriesWithAxisOptions, (seriesObject) => (seriesObject.data[0] ? seriesObject.data[0].color : undefined)),
    (color) => color
  );

  const xAxisItems = getXAxisItemsFromChartConfiguration(chartConfiguration);

  const xAxisCategories = getSanitizedChartXAxisCategories(seriesWithAxisOptions, xAxisItems);

  return {
    ...initialChartObject,
    yAxis: getChartYAxisOptions(chartConfiguration),
    xAxis: getChartXAxisOptions(xAxisCategories, chartConfiguration.type),
    colors: newColors.length > 0 ? newColors : initialChartObject.colors,
    series: seriesWithAxisOptions,
  };
}
