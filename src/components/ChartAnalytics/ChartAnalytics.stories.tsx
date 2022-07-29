import { CssReset } from "@dhis2/ui";
import type { ComponentStory } from "@storybook/react";
import HighCharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighChartsExport from "highcharts/modules/exporting";
import React, { useState } from "react";
import ChartDownloadMenu from "./components/DownloadMenu";
import columnData from "./data/column-data.json";
import multiSeriesData from "./data/multi-series-data.json";
import pieData from "./data/pie-data.json";
import stackedChartData from "./data/stacked-chart-data.json";
import ChartAnalytics from ".";

const Template: ComponentStory<any> = (args) => <ChartAnalytics {...args} />;
HighChartsExport(HighCharts);

export const Column = Template.bind({});
Column.args = {
  analytics: columnData as any,
  config: {
    layout: {
      series: ["dx"],
      category: ["ou"],
      filter: ["pe"],
    },
    type: "column",
    height: 500,
    colors: ["#2f7ed8", "#0d233a", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"],
  },
};

export const MultipleSeries = Template.bind({});
MultipleSeries.args = {
  analytics: multiSeriesData as any,
  config: {
    layout: {
      series: ["ou"],
      category: ["pe"],
      filter: ["d"],
    },
    type: "column",
    height: 500,
    colors: ["#2f7ed8", "#0d233a", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96"],
  },
};

export const PieChart = Template.bind({});
PieChart.args = {
  analytics: pieData as any,
  config: {
    layout: {
      series: ["dx"],
      category: [],
      filter: ["dx", "p"],
    },
    type: "pie",
    height: 500,
    colors: ["#2f7ed8", "#0d233a", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96"],
  },
};

export const StackedColumn = Template.bind({});
StackedColumn.args = {
  analytics: stackedChartData as any,
  config: {
    layout: {
      series: ["ou"],
      category: ["pe"],
      filter: ["d"],
    },
    type: "stacked-column",
    height: 500,
    colors: ["#2f7ed8", "#0d233a", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96"],
  },
};

export default {
  title: "Components/Chart Analytics",
  component: ChartAnalytics,
  decorators: [
    (ChartStory: any) => {
      const [chartRef, setChartRef] = useState<HighchartsReact.RefObject | null>(null);
      return (
        <div style={{ width: 1000, height: "100%", display: "flex", gap: 8, flexDirection: "column" }}>
          <CssReset />
          <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>{<ChartDownloadMenu chartRef={chartRef} />}</div>
          <ChartStory ref={setChartRef} />
        </div>
      );
    },
  ],
};
