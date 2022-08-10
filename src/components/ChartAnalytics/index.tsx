import { uid } from "@hisptz/dhis2-utils";
import HighCharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { forwardRef, useRef } from "react";
import ChartDownloadMenu from "./components/DownloadMenu";
import { useChart } from "./hooks/useChart";
import { ChartAnalyticsProps } from "./types/props";
import "./styles/custom-highchart.css";

export * from "./services/export";
export { ChartDownloadMenu };

function ChartAnalytics({ analytics, config, containerProps }: ChartAnalyticsProps, ref: React.ForwardedRef<HighchartsReact.RefObject>) {
  const id = useRef(`${uid()}-chart-item`);
  const { chart } = useChart({ id: id.current, analytics, config });

  if (!chart) {
    return null;
  }
  return <HighchartsReact immutable ref={ref} containerProps={{ id: id.current, ...(containerProps ?? {}) }} highcharts={HighCharts} options={{ ...chart }} />;
}

export default forwardRef(ChartAnalytics);
