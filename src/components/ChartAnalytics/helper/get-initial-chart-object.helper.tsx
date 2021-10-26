
// import { getChartTitleObject } from './get-chart-title-object.helper';
// import { getChartSubtitleObject } from './get-chart-subtitle.helper';
// import { getChartCreditsOptions } from './get-chart-credit-options.helper';
// import { getChartColors } from './get-chart-colors.helper';
// import { getPlotOptions } from './get-chart-plot-options.helper';
// import { getTooltipOptions } from './get-chart-tooltip-options.helper';
// import { getChartExportingOptions } from './get-chart-exporting-options.helper';
import { ChartConfiguration } from '../interfaces/props';

export function getInitialChartObject(
  analyticsObject: any,
  chartConfiguration: ChartConfiguration
) {
  return {
    chart: getChartAttributeOptions(chartConfiguration),
    title: getChartTitleObject(chartConfiguration),
    subtitle: getChartSubtitleObject(chartConfiguration, analyticsObject),
    credits: getChartCreditsOptions(),
    colors: getChartColors(),
    plotOptions: getPlotOptions(chartConfiguration),
    tooltip: getTooltipOptions(chartConfiguration)
  };
}
