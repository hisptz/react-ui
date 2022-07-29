import type { Analytics } from "@hisptz/dhis2-utils";
import HighCharts from "highcharts";

export type ChartType = "column" | "pie" | "stacked-column" | "line";

export type ChartConfigurationProps = {
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
};

export type ChartAnalyticsProps = {
  analytics: Analytics;
  config: ChartConfigurationProps;
};

export type ChartConfiguration = {
  chart: HighCharts.ChartOptions;
  colors?: Array<string>;
  series: HighCharts.Series[];
  plotOptions?: HighCharts.PlotOptions;
  title: HighCharts.TitleOptions;
  pane?: HighCharts.PaneOptions;
  xAxis: HighCharts.XAxisOptions;
  yAxis?: HighCharts.YAxisOptions[];
  exporting: HighCharts.ExportingOptions;
  legend: HighCharts.LegendOptions;
  credits: HighCharts.CreditsOptions;
};
