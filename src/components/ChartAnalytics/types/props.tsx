import type { Analytics } from "@hisptz/dhis2-utils";
import { DashStyleValue, YAxisOptions, YAxisPlotLinesLabelOptions } from "highcharts";

export type ChartType = "column" | "pie" | "stacked-column" | "line" | "multi-series";

export interface MultiSeriesConfig {
  series?: Array<{
    id: string;
    as: "column" | "line";
    cumulative?: boolean;
    yAxis?: number;
  }>;
  yAxes?: Array<YAxisOptions>;
  target?: TargetConfig;
}

export interface TargetConfig {
  id: string;
  value: number;
  label?: YAxisPlotLinesLabelOptions;
  styles: {
    color?: string;
    width?: number;
    dashStyle?: DashStyleValue;
    zIndex?: number;
  };
}

export type ChartConfig = {
  layout: {
    series: Array<string>;
    category: Array<string>;
    filter: Array<string>;
  };
  type?: ChartType;
  height?: number;
  colors?: Array<string>;
  name?: string;
  allowChartTypeChange?: boolean;
  highChartOverrides?: Record<string, any>;
  multiSeries?: MultiSeriesConfig;
};

export type ChartAnalyticsProps = {
  analytics: Analytics;
  config: ChartConfig;
};
