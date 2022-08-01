import { PlotOptions, SeriesOptionsType, XAxisOptions } from "highcharts";
import { getAllCategories, getPointSeries } from "../utils/chart";
import { DHIS2Chart } from "./index";

export class DHIS2LineChart extends DHIS2Chart {
  getHighchartsType(): string {
    return "line";
  }

  getPlotOptions(): PlotOptions {
    return {
      line: {},
    };
  }

  getSeries(): SeriesOptionsType[] {
    return getPointSeries(this.analytics, this.config, "line");
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
