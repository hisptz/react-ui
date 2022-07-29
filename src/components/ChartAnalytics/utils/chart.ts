import type { Analytics, AnalyticsHeader, AnalyticsMetadata } from "@hisptz/dhis2-utils";
import HighCharts from "highcharts";
import { compact, find, head, isEmpty, set } from "lodash";
import { ChartConfiguration, ChartConfigurationProps, ChartType } from "../types/props";

function getHighchchartType(config: ChartConfigurationProps): string {
  switch (config.type) {
    case "pie":
      return "pie";
    case "stacked-column":
      return "column";
    default:
      return "column";
  }
}

function getChartConfig(id: string, config: ChartConfigurationProps): HighCharts.ChartOptions {
  return {
    renderTo: id,
    zoomType: "xy",
    type: getHighchchartType(config),
    height: config.height,
    styledMode: false,
  };
}

function getPieSeries(analytics: Analytics, config: ChartConfigurationProps): any {
  const seriesDimension = head(config.layout.series);
  const seriesIndex = analytics?.headers?.findIndex((h) => h.name === seriesDimension) ?? -1;
  const valueIndex = analytics?.headers?.findIndex((h) => h.name === "value") ?? -1;

  if (!seriesDimension) {
    throw new Error("Pie chart must have a series dimension");
  }
  const seriesValues = analytics.metaData?.dimensions?.[seriesDimension as "dx" | "ou" | "pe"];

  return {
    id: seriesDimension,
    name: analytics.metaData?.items?.[seriesDimension as any]?.name,
    data: seriesValues?.map((value: string) => {
      const row = analytics?.rows?.find((row: any) => row[seriesIndex] === value);

      return {
        name: analytics.metaData?.items?.[value as any]?.name,
        y: row?.[valueIndex] ? parseFloat(row?.[valueIndex] ?? "") : 0,
      };
    }),
  };
}

function getColumnSeries(analytics: Analytics, header: AnalyticsHeader, config: ChartConfigurationProps): any {
  const headerIndex = analytics?.headers?.findIndex((h) => header.name === h.name);
  const valueIndex = analytics?.headers?.findIndex((h) => h.name === "value");

  const colors = config.colors ?? [];

  const { items, dimensions } = analytics?.metaData ?? {};
  const categoriesDimension = config.layout.category;

  const seriesDimensionValues: string[] = dimensions?.[header.name as "dx" | "ou" | "pe"] ?? [];

  return head(
    categoriesDimension?.map((categoryDimension: string) => {
      const categories: string[] = dimensions?.[categoryDimension as "dx" | "ou" | "pe"] as any;
      const categoryDimensionIndex = analytics?.headers?.findIndex((h) => h.name === categoryDimension);
      return seriesDimensionValues?.map((seriesDimensionValue: string, index) => {
        const data = categories?.map((category: string) => {
          const row = find(analytics?.rows, (row: any) => row[headerIndex ?? -1] === seriesDimensionValue && row[categoryDimensionIndex ?? -1] === category);
          return row?.[valueIndex ?? -1] ? parseFloat(row?.[valueIndex ?? -1]) : 0;
        });
        return {
          name: items?.[seriesDimensionValue as any]?.name,
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
  switch (config.type) {
    case "pie":
      return getPieSeries(analytics, config);
    default:
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
}

function getCategories({ name }: AnalyticsHeader, { items, dimensions }: AnalyticsMetadata): string[] {
  const categories: string[] = dimensions?.[name as "dx" | "ou" | "pe"] as any;

  return categories?.map((category: string) => {
    return items[category as any]?.name ?? "";
  }) as unknown as string[];
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

function getXAxis(analytics: Analytics, config: ChartConfigurationProps): any {
  if (config.type === "pie") {
    return undefined;
  }

  return {
    type: "category",
    categories: getAllCategories(analytics, config),
    crosshair: true,
    labels: {
      enabled: true,
    },
    title: { text: "" },
  };
}

function getExporting(name: string): HighCharts.ExportingOptions {
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

function getPlotOptions(config: ChartConfigurationProps): HighCharts.PlotOptions | undefined {
  switch (config.type) {
    case "pie":
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

    case "stacked-column":
      return {
        column: {
          stacking: "normal",
          dataLabels: {
            enabled: true,
          },
        },
      };

    default:
      return {};
  }
}

export function getHighchartsConfig(id: string, analytics: Analytics, config: ChartConfigurationProps): ChartConfiguration {
  return {
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
    series: getSeriesConfig(analytics, config),
    plotOptions: getPlotOptions(config),
    title: { text: "" },
    xAxis: getXAxis(analytics, config),
    exporting: getExporting(config.name ?? "chart"),
    legend: { enabled: true },
    credits: { enabled: false },
    ...(config.highChartOverrides ?? {}),
  };
}

export function updateLayout(config: ChartConfigurationProps, { type }: { type: ChartType }) {
  if (type === config.type) {
    return config.layout;
  }

  const updatedLayout = { ...config.layout };

  switch (type) {
    case "pie":
      set(updatedLayout, "category", []);
      if (isEmpty(updatedLayout.series)) {
        if (!isEmpty(config.layout.category)) {
          set(updatedLayout, "series", [head(config.layout.category)]);
        } else {
          throw new Error("Invalid layout for pie chart");
        }
      }
      if (updatedLayout.series.length > 1) {
        set(updatedLayout, "series", [head(updatedLayout.series)]);
      }
  }

  return updatedLayout;
}
