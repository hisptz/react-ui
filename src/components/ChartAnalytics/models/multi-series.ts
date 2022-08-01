import { PlotOptions, SeriesOptionsType, XAxisOptions, YAxisOptions } from "highcharts";
import { compact, head } from "lodash";
import { MultiSeriesConfig } from "../types/props";
import { getAllCategories, getDimensionHeaderIndex } from "../utils/chart";
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
    const analytics = this.analytics;
    const config = this.config;

    const categoryDimension = head(config.layout.category);
    const seriesConfig: MultiSeriesConfig | undefined = this.config.multiSeries;

    const categoryIndex = getDimensionHeaderIndex(analytics.headers ?? [], categoryDimension ?? "");
    const seriesIndex = getDimensionHeaderIndex(analytics.headers ?? [], head(config.layout.series) ?? "");
    const valueIndex = getDimensionHeaderIndex(analytics.headers ?? [], "value");

    if (!categoryDimension) {
      throw new Error("At least one category dimension is required");
    }

    if (!seriesConfig) {
      throw new Error("MultiSeries config is required for chart type multi-series");
    }

    const series = compact(
      seriesConfig?.series?.map(({ id, as }) => {
        const dataItem = analytics.metaData?.items[id as any];
        const categoryItems = analytics.metaData?.dimensions[categoryDimension as "dx" | "ou" | "pe"];

        const data = categoryItems?.map((item: string) => {
          const row = analytics.rows?.find((row: any) => row[categoryIndex] === item && row[seriesIndex] === id);
          return row?.[valueIndex] ? parseFloat(row?.[valueIndex]) : 0;
        });

        return {
          name: dataItem?.name,
          data,
          type: as,
        };
      })
    ) as SeriesOptionsType[];

    console.log(series);
    return series;
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

  getYAxis(): YAxisOptions[] {
    if (!this.config.multiSeries?.target) {
      return super.getYAxis();
    }

    const { value, styles, label } = this.config.multiSeries.target ?? {};

    const yAxis = super.getYAxis();

    return [
      {
        ...yAxis[0],
        plotLines: [
          ...(yAxis[0].plotLines ?? []),
          {
            color: styles?.color ?? "#00FF00",
            dashStyle: styles?.dashStyle ?? "Solid",
            value,
            width: styles?.width ?? 2,
            zIndex: styles?.zIndex ?? 1000,
            label: label,
          },
        ],
      },
    ];
  }
}
