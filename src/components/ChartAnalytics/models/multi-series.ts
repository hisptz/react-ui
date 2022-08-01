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

    return compact(
      seriesConfig?.series?.map(({ id, as, cumulative, yAxis }) => {
        const dataItem = analytics.metaData?.items[id as any];
        const categoryItems = analytics.metaData?.dimensions[categoryDimension as "dx" | "ou" | "pe"];

        const data = categoryItems?.map((item: string) => {
          const row = analytics.rows?.find((row: any) => row[categoryIndex] === item && row[seriesIndex] === id);
          return row?.[valueIndex] ? parseFloat(row?.[valueIndex]) : 0;
        });

        let cumulativeData: number[] = [];

        if (cumulative) {
          cumulativeData =
            data?.reduce((acc, curr, index) => {
              if (index === 0) {
                return [...acc, curr];
              }
              return [...acc, acc[index - 1] + curr];
            }, [] as number[]) ?? [];
        }

        return {
          name: dataItem?.name,
          data: cumulative ? cumulativeData : data,
          type: as,
          yAxis: yAxis ?? 0,
        };
      })
    ) as SeriesOptionsType[];
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
    let yAxes: YAxisOptions[] = [];

    if (this.config.multiSeries?.yAxes) {
      yAxes = this.config.multiSeries?.yAxes;
    } else {
      yAxes = super.getYAxis();
    }

    if (!this.config.multiSeries?.target) {
      return yAxes;
    }

    const { value, styles, label } = this.config.multiSeries?.target ?? {};

    return [
      {
        ...yAxes[0],
        plotLines: [
          ...(yAxes[0].plotLines ?? []),
          {
            color: styles?.color ?? "#00FF00",
            dashStyle: styles?.dashStyle ?? "Solid",
            value,
            width: styles?.width ?? 2,
            zIndex: styles?.zIndex ?? 1000,
            label: labe,
          ,
        ,
      },
      ...yAxes.slice(1,
    ];
  }
}
