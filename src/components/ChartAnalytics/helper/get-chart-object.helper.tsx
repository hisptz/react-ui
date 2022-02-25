import { clone } from "lodash";
import { ChartConfiguration } from "../types/props";
import { getInitialChartObject } from "./get-initial-chart-object.helper";
import { getSanitizedanalyticsBasedOnConfiguration } from "./get-sanitized-analytics-based-on-chart-configuration.helper";
import { getSanitizedChartObject } from "./get-sanitized-chart-object.helper";
import { getSolidGaugeChartObject } from "./get-solid-gauge-chart-object.helper";
import { getSpiderWebChartObject } from "./get-spider-web-chart-object.helper";

export function getCharObject(incomingAnalyticObject: any, chartConfiguration: ChartConfiguration) {
  const analyticsObject = getSanitizedanalyticsBasedOnConfiguration(incomingAnalyticObject, chartConfiguration);

  let chartObject: any = getInitialChartObject(analyticsObject, chartConfiguration);

  /**
   * Extend chart options depending on type
   */
  const newChartConfiguration = clone(chartConfiguration);

  switch (chartConfiguration.type) {
    case "radar":
      chartObject = getSpiderWebChartObject(chartObject, analyticsObject, chartConfiguration);
      break;
    case "solidgauge":
      chartObject = getSolidGaugeChartObject(chartObject, analyticsObject, chartConfiguration);
      break;
    case "gauge":
      newChartConfiguration.type = "solidgauge";
      chartObject = getSolidGaugeChartObject(chartObject, analyticsObject, newChartConfiguration);
      break;
    default:
      return getSanitizedChartObject(getSpiderWebChartObject(chartObject, analyticsObject, chartConfiguration), chartConfiguration);
  }
  return getSanitizedChartObject(chartObject, chartConfiguration);
}
