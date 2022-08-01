import type { Analytics } from "@hisptz/dhis2-utils";
import HighCharts from "highcharts";
import { ChartConfigurationProps } from "../types/props";

export abstract class DHIS2Chart {
  id: string;
  analytics: Analytics;
  config: ChartConfigurationProps;

  constructor(id: string, analytics: Analytics, config: ChartConfigurationProps) {
    this.id = id;
    this.analytics = analytics;
    this.config = config;
  }

  abstract getHighchartsType(): string;

  getChartConfig(): HighCharts.ChartOptions {
    return {
      renderTo: this.id,
      zoomType: "xy",
      type: this.getHighchartsType(),
      height: this.config?.height,
      styledMode: false,
    };
  }

  getOptions(): HighCharts.Options {
    return {
      yAxis: this.getYAxis(),
      chart: this.getChartConfig(),
      colors: this.config?.colors ?? ["#2f7ed8", "#0d233a", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"],
      series: this.getSeries(),
      plotOptions: this.getPlotOptions(),
      title: { text: "" },
      xAxis: this.getXAxis(),
      exporting: this.getExporting(),
      legend: { enabled: true },
      credits: { enabled: false },
      ...(this.config?.highChartOverrides ?? {}),
    };
  }

  abstract getSeries(): HighCharts.SeriesOptionsType[];

  abstract getPlotOptions(): HighCharts.PlotOptions;

  abstract getXAxis(): HighCharts.XAxisOptions | undefined;

  getYAxis(): HighCharts.YAxisOptions[] | undefined {
    return [
      {
        title: {
          text: "",
          style: { color: "#000000", fontWeight: "normal", fontSize: "14px" },
        },
        labels: { enabled: true, style: { color: "#000000", fontWeight: "normal", fontSize: "14px" } },
        plotLines: [
          { color: "#000000", dashStyle: "Solid", width: 2, zIndex: 1000, label: { text: "" } },
          { color: "#bbbbbb", dashStyle: "Solid", zIndex: 1000, width: 2, label: { text: "" } },
        ],
      },
    ];
  }

  getExporting(): HighCharts.ExportingOptions {
    const name = this.config?.name ?? "chart";
    return {
      filename: `${name}`,
      sourceWidth: 1200,
      buttons: {
        contextButton: {
          enabled: false,
        },
      },
    };
  }
}
