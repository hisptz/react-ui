import { PlotOptions, SeriesOptionsType, XAxisOptions } from "highcharts";
import { getAllCategories, getPointSeries } from "../utils/chart";
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
    return getPointSeries(this.analytics, this.config, "column");
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
