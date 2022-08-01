import { PlotOptions, SeriesOptionsType, XAxisOptions } from "highcharts";
import { getAllCategories, getColumnSeries } from "../utils/chart";
import { DHIS2Chart } from "./index";

export class DHIS2ColumnChart extends DHIS2Chart {
  getCategories(): any[] | undefined {
    return undefined;
  }

  getHighchartsType(): string {
    return "column";
  }

  getPlotOptions(): PlotOptions {
    return {
      column: {
        dataLabels: {
          enabled: true,
        },
      },
    };
  }

  getSeries(): SeriesOptionsType[] {
    const analytics = this.analytics;
    const config = this.config;
    const series: string[] = config.layout.series;

    return series.map((seriesName: string) => {
      const header = analytics?.headers?.find((header: any) => header.name === seriesName);
      if (!header) {
        return undefined;
      }
      if (analytics?.metaData) {
        return getColumnSeries(analytics, header, config);
      }
    })[0];
  }

  getXAxis(): XAxisOptions | undefined {
    return {
      type: "category",
      categories: getAllCategories(this.analytics, this.config),
      crosshair: true,
      labels: {
        enabled: true,
      },
      title: { text: "" },
    };
  }
}

export class DHIS2StackedColumnChart extends DHIS2ColumnChart {
  getPlotOptions(): PlotOptions {
    return {
      column: {
        stacking: "normal",
        ...super.getPlotOptions().column,
      },
    };
  }
}
