import type { Analytics, AnalyticsHeader, AnalyticsMetadata } from "@hisptz/dhis2-utils";
import HighCharts from "highcharts";
import { compact, find, head } from "lodash";
import { ChartConfiguration, ChartConfigurationProps } from "../types/props";

function getChartConfig(id: string, config: ChartConfigurationProps): HighCharts.ChartOptions {
  return {
    renderTo: id,
    zoomType: "xy",
    type: config.type ?? "column",
    height: config.height,
    styledMode: false,
  };
}

function getSeries(analytics: Analytics, header: AnalyticsHeader, config: ChartConfigurationProps): any {
  const headerIndex = analytics?.headers?.findIndex((h) => header.name === h.name);
  const valueIndex = analytics?.headers?.findIndex((h) => h.name === "value");

  const colors = config.colors ?? [];

  const { items, dimensions } = analytics?.metaData ?? {};
  const categoriesDimension = config.layout.category;

  const seriesDimensionValues: string[] = dimensions?.[header.name];

  return head(
    categoriesDimension?.map((categoryDimension: string) => {
      const categories: string[] = dimensions?.[categoryDimension] as any;
      const categoryDimensionIndex = analytics?.headers?.findIndex((h) => h.name === categoryDimension);
      return seriesDimensionValues?.map((seriesDimensionValue: string, index) => {
        const data = categories?.map((category: string) => {
          const row = find(analytics?.rows, (row: any) => row[headerIndex ?? -1] === seriesDimensionValue && row[categoryDimensionIndex ?? -1] === category);
          return row?.[valueIndex ?? -1] ? parseFloat(row?.[valueIndex ?? -1]) : 0;
        });
        return {
          name: items?.[seriesDimensionValue as string]?.name,
          data,
          type: "column",
          color: colors[index % colors.length],
        };
      });
    })
  );
}

function getSeriesConfig(analytics: Analytics, config: ChartConfigurationProps): Array<any> {
  const series: string[] = config.layout.series;

  return series.map((seriesName: string) => {
    const header = analytics?.headers?.find((header: any) => header.name === seriesName);
    if (!header) {
      return undefined;
    }
    if (analytics?.metaData) {
      return getSeries(analytics, header, config);
    }
  });
}

function getCategories({ name }: AnalyticsHeader, { items, dimensions }: AnalyticsMetadata): string[] {
  const categories: string[] = dimensions?.[name] as any;

  return categories?.map((category: string) => {
    return items[category]?.name;
  });
}

function getAllCategories(analytics: Analytics, config: ChartConfigurationProps): string[] {
  if (config.type === "pie") {
    return [];
  }
  const categories = config.layout.category;

  return compact(
    categories?.map((category: string) => {
      const header = analytics?.headers?.find((header: any) => header.name === category);
      if (!header) {
        return undefined;
      }
      if (analytics?.metaData) {
        return getCategories(header, analytics?.metaData);
      }
    })
  )[0];
}

function getExporting(name: string) {
  return {
    scaling: 1,
    filename: `${name}`,
    sourceWidth: 1200,
  };
}

function getSeriesName(analytics: Analytics, config: ChartConfigurationProps) {
  const series = config.layout.series;
  const headers = series.map((seriesName: string) => analytics.headers?.find((header: any) => header.name === seriesName));

  return headers.map((header: AnalyticsHeader) => header.valueType).join(", ");
}

export function useChart({ id, analytics, config }: { id: string; analytics: Analytics; config: ChartConfigurationProps }): {
  chart: ChartConfiguration;
} {
  return {
    chart: {
      yAxis: [
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
      ],
      chart: getChartConfig(id, config),
      colors: config.colors ?? ["#2f7ed8", "#0d233a", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"],
      series: getSeriesConfig(analytics, config)[0],
      title: { text: "" },
      xAxis: {
        type: "category",
        categories: getAllCategories(analytics, config),
        crosshair: true,
        labels: {
          enabled: true,
        },
        title: { text: "" },
      },
      exporting: getExporting(config.name ?? "chart"),
      legend: { enabled: true },
      ...(config.highChartOverrides ?? {}),
    },
  };
}
