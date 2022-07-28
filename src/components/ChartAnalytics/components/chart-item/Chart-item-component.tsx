import HighCharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useRef } from "react";
import { useChart } from "../../hooks/useChart";
import { ChartAnalyticsProps } from "../../types/props";
import "./chart-item-component.css";
import { uid } from "@hisptz/dhis2-utils";

export default function ChartItemComponent({ analytics, config }: ChartAnalyticsProps) {
  const id = useRef(`${uid()}-chart-item`);
  const { chart } = useChart({ id: id.current, analytics, config });

  console.log(chart);

  return (
    <div className="chart-item-container" style={{ width: "100%" }}>
      <HighchartsReact containerProps={{ id: id.current }} highcharts={HighCharts} options={chart} />
    </div>
  );
}
