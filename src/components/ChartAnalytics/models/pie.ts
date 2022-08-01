import { PlotOptions, SeriesOptionsType, XAxisOptions } from "highcharts";
import { head } from "lodash";
import { DHIS2Chart } from "./index";

export class DHIS2PieChart extends DHIS2Chart {
  getHighchartsType(): string {
    return "pie";
  }

  getPlotOptions(): PlotOptions {
    return {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    };
  }

  getSeries(): SeriesOptionsType[] {
    const analytics = this.analytics;
    const config = this.config;
    const seriesDimension = head(config.layout.series);
    const seriesIndex = analytics?.headers?.findIndex((h) => h.name === seriesDimension) ?? -1;
    const valueIndex = analytics?.headers?.findIndex((h) => h.name === "value") ?? -1;

    if (!seriesDimension) {
      throw new Error("Pie chart must have a series dimension");
    }
    const seriesValues = analytics.metaData?.dimensions?.[seriesDimension as "dx" | "ou" | "pe"];

    return [
      {
        id: seriesDimension ?? "",
        name: analytics.metaData?.items?.[seriesDimension as any]?.name ?? "",
        data: seriesValues?.map((value: string) => {
          const row = analytics?.rows?.find((row: any) => row[seriesIndex] === value);

          return {
            name: analytics.metaData?.items?.[value as any]?.name,
            y: row?.[valueIndex] ? parseFloat(row?.[valueIndex] ?? "") : 0,
          };
        }),
      } as SeriesOptionsType,
    ];
  }

  getXAxis(): XAxisOptions | undefined {
    return undefined;
  }
}
