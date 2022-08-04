import { mount } from "@cypress/react";
import HighCharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useState } from "react";
import ChartDownloadMenu from "./components/DownloadMenu";
import columnData from "./data/column-data.json";
import { setupHighchartsModules } from "./services/export";
import ChartAnalytics from ".";

const props: any = {
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

function TestComponent() {
  return <ChartAnalytics {...props} />;
}

function ExportTestComponent() {
  const [chartRef, setChartRef] = useState<HighchartsReact.RefObject | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <ChartDownloadMenu chartRef={chartRef} />
      </div>
      <ChartAnalytics {...props} ref={setChartRef} />
    </div>
  );
}

describe("Chart Component Tests", () => {
  setupHighchartsModules(HighCharts);

  it("Mounts without errors", () => {
    mount(<TestComponent />);
  });

  it("Can be exported as PDF", () => {
    mount(<ExportTestComponent />);
  });
});
