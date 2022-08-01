import { PlotOptions, SeriesOptionsType, XAxisOptions } from "highcharts";
import { DHIS2Chart } from "./index";

export class DHIS2MultiSeriesChart extends DHIS2Chart {
  getHighchartsType(): string {
    return "";
  }

  getPlotOptions(): PlotOptions {
    return {
      column: {},
      line: {},
    };
  }

  getSeries(): SeriesOptionsType[] {
    return [];
  }

  getXAxis(): XAxisOptions | undefined {
    return undefined;
  }
}
