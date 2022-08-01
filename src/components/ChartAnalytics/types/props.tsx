import type { Analytics } from "@hisptz/dhis2-utils";

export type ChartType = "column" | "pie" | "stacked-column" | "line" | "multi-series";

export type ChartConfig = {
  layout: {
    series: Array<string>;
    category: Array<string>;
    filter: Array<string>;
  };
  type?: ChartType;
  height?: number;
  colors?: Array<string>;
  name?: string;
  allowChartTypeChange?: boolean;
  highChartOverrides?: Record<string, any>;
  multiSeries?: {
    series?: Array<{
      id: string;
      as: "column" | "line";
    }>;
    target?: {
      id: string;
      value: number;
      label: string;
      styles: Record<string, any>;
    };
  };
};

export type ChartAnalyticsProps = {
  analytics: Analytics;
  config: ChartConfig;
};
