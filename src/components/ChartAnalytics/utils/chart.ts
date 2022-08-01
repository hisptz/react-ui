import type { Analytics, AnalyticsHeader, AnalyticsMetadata } from "@hisptz/dhis2-utils";
import { compact, find, head, isEmpty, set } from "lodash";
import { DHIS2Chart } from "../models";
import { DHIS2ColumnChart, DHIS2StackedColumnChart } from "../models/column";
import { DHIS2LineChart } from "../models/line";
import { DHIS2PieChart } from "../models/pie";
import { ChartConfig, ChartType } from "../types/props";

export function getPointSeries(analytics: Analytics, config: ChartConfig, highchartsType: string) {
  const series: string[] = config.layout.series;

  return series.map((seriesName: string) => {
    const header = analytics?.headers?.find((header: any) => header.name === seriesName);
    if (!header) {
      return undefined;
    }
    if (analytics?.metaData) {
      return getColumnSeries(analytics, header, config, highchartsType);
    }
  })[0];
}

export function getColumnSeries(analytics: Analytics, header: AnalyticsHeader, config: ChartConfig, highchartsType: string): any {
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
          type: highchartsType,
          color: colors[index % colors.length],
        };
      });
    })
  );
}

function getCategories({ name }: AnalyticsHeader, { items, dimensions }: AnalyticsMetadata): string[] {
  const categories: string[] = dimensions?.[name as "dx" | "ou" | "pe"] as any;

  return categories?.map((category: string) => {
    return items[category as any]?.name ?? "";
  }) as unknown as string[];
}

export function getAllCategories(analytics: Analytics, config: ChartConfig): string[] {
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

export function updateLayout(config: ChartConfig, { type }: { type: ChartType }) {
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

export function getChartInstance(id: string, analytics: Analytics, config: ChartConfig): DHIS2Chart {
  switch (config.type) {
    case "column":
      return new DHIS2ColumnChart(id, analytics, config);
    case "stacked-column":
      return new DHIS2StackedColumnChart(id, analytics, config);
    case "pie":
      return new DHIS2PieChart(id, analytics, config);
    case "line":
      return new DHIS2LineChart(id, analytics, config);
    default:
      throw new Error(`Unsupported chart type: ${config.type}`);
  }
}
