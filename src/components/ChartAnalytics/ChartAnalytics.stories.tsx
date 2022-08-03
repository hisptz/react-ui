import { CssReset } from "@dhis2/ui";
import type { Story } from "@storybook/react";
import HighCharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useState } from "react";
import ChartDownloadMenu from "./components/DownloadMenu";
import columnData from "./data/column-data.json";
import complexMultiSeriesData from "./data/complex-multi-series-data.json";
import multiSeriesData from "./data/multi-series-data.json";
import pieData from "./data/pie-data.json";
import stackedChartData from "./data/stacked-chart-data.json";
import { setupHighchartsModules } from "./services/export";
import { ChartAnalyticsProps } from "./types/props";
import ChartAnalytics from ".";

const Template: Story<ChartAnalyticsProps> = (args) => <ChartAnalytics {...args} />;
setupHighchartsModules(HighCharts);

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

export const MultipleColumns = Template.bind({});
MultipleColumns.args = {
  analytics: multiSeriesData as any,
  config: {
    layout: {
      series: ["ou"],
      category: ["pe"],
      filter: ["dx"],
    },
    type: "column",
    height: 1000,
    colors: ["#2f7ed8", "#0d233a", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"],
  },
};

export const StackedColumn = Template.bind({});
StackedColumn.args = {
  analytics: stackedChartData as any,
  config: {
    layout: {
      series: ["ou"],
      category: ["pe"],
      filter: ["dx"],
    },
    type: "stacked-column",
    height: 1000,
    colors: ["#2f7ed8", "#0d233a", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"],
  },
};

export const Line = Template.bind({});
Line.args = {
  analytics: columnData as any,
  config: {
    layout: {
      series: ["dx"],
      category: ["ou"],
      filter: ["pe"],
    },
    type: "line",
    height: 1000,
    colors: ["#2f7ed8", "#0d233a", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"],
  },
};

export const MultipleLines = Template.bind({});
MultipleLines.args = {
  analytics: multiSeriesData as any,
  config: {
    layout: {
      series: ["ou"],
      category: ["pe"],
      filter: ["dx"],
    },
    type: "line",
    height: 500,
    colors: ["#2f7ed8", "#0d233a", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"],
  },
};

export const PieChart = Template.bind({});
PieChart.args = {
  analytics: pieData as any,
  config: {
    layout: {
      series: ["dx"],
      category: [],
      filter: ["dx", "pe"],
    },
    type: "pie",
    height: 500,
    colors: ["#2f7ed8", "#0d233a", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c4255", "#a6c96a"],
  },
};

export const MultiSeries = Template.bind({});
MultiSeries.args = {
  analytics: multiSeriesData as any,
  config: {
    layout: {
      series: ["ou"],
      category: ["pe"],
      filter: ["dx"],
    },
    type: "multi-series",
    height: 500,
    colors: ["#2f7ed8", "#0d233a", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"],
    multiSeries: {
      series: [
        {
          id: "qhqAxPSTUXp",
          as: "column",
          yAxis: 0,
        },
        {
          id: "Vth0fbpFcsO",
          as: "line",
          cumulative: true,
          yAxis: 1,
        },
      ],
      yAxes: [
        {
          id: "yAxis1",
          title: {
            text: "Koinandugu",
          },
          labels: {
            format: "{value}",
          },
        },
        {
          id: "yAxis2",
          title: {
            text: "Kono",
          },
          labels: {
            format: "{value}",
          },
          opposite: true,
        },
      ],
      target: {
        id: "",
        styles: {
          color: "blue",
        },
        value: 45,
        label: {
          text: "Target",
          textAlign: "center",
          verticalAlign: "middle",
        },
      },
    },
  },
};

export const ComplexMultiSeries = Template.bind({});
ComplexMultiSeries.args = {
  analytics: complexMultiSeriesData as any,
  config: {
    layout: {
      series: ["dx"],
      category: ["pe"],
      filter: ["ou"],
    },
    type: "multi-series",
    height: 500,
    colors: ["#2f7ed8", "#0d233a", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"],
    multiSeries: {
      series: [
        {
          id: "QQkOAJFukyY",
          as: "column",
          yAxis: 0,
        },
        {
          id: "QQkOAJFukyY",
          as: "line",
          cumulative: true,
          yAxis: 1,
        },
      ],
      yAxes: [
        {
          id: "yAxis1",
          title: {
            text: "Koinandugu",
          },
          labels: {
            format: "{value}",
          },
        },
        {
          id: "yAxis2",
          title: {
            text: "Kono",
          },
          labels: {
            format: "{value}",
          },
          opposite: true,
        },
      ],
      target: {
        id: "",
        styles: {
          color: "blue",
        },
        value: 45,
        label: {
          text: "Target",
          textAlign: "center",
          verticalAlign: "middle",
        },
      },
    },
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
