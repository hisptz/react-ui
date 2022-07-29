import { uid } from "@hisptz/dhis2-utils";
import HighCharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { forwardRef, useRef } from "react";
import { useChart } from "./hooks/useChart";
import { ChartAnalyticsProps } from "./types/props";

function ChartAnalytics({ analytics, config }: ChartAnalyticsProps, ref: React.ForwardedRef<HighchartsReact.RefObject>) {
  const id = useRef(`${uid()}-chart-item`);
  const { chart } = useChart({ id: id.current, analytics, config });

  if (!chart) {
    return null;
  }
  return <HighchartsReact ref={ref} containerProps={{ id: id.current }} highcharts={HighCharts} options={{ ...chart }} />;
}

export default forwardRef(ChartAnalytics);
