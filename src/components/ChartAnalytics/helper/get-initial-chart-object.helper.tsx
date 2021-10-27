
import { ChartConfiguration } from '../types/props';
import { getChartAttributeOptions } from './get-chart-attribute-options.helper';
import { getChartColors } from './get-chart-colors.helper';
import { getChartCreditsOptions } from './get-chart-credit-options.helper';
import { getPlotOptions } from './get-chart-plot-options.helper';
import { getChartSubtitleObject } from './get-chart-subtitle.helper';
import { getChartTitleObject } from './get-chart-title-object.helper';
import { getTooltipOptions } from './get-chart-tooltip-options.helper';

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
