import type { Analytics } from "@hisptz/dhis2-utils";
import HighCharts from "highcharts";
import { useCallback, useEffect, useState } from "react";
import { DHIS2Chart } from "../models";
import { ChartConfigurationProps, ChartType } from "../types/props";
import { getChartTypeInstance, updateLayout } from "../utils/chart";

export function useChart({ id, analytics, config }: { id: string; analytics: Analytics; config: ChartConfigurationProps }): {
  chart?: HighCharts.Options;
  changeChartType: (type: ChartType) => void;
} {
  const [chart, setChart] = useState<HighCharts.Options | undefined>();

  const changeChartType = useCallback(
    (type: ChartType) => {
      const updatedLayout = updateLayout(config, { type });
      const updatedConfig = { ...config, layout: updatedLayout, type };
      const chartInstance: DHIS2Chart = getChartTypeInstance(id, analytics, updatedConfig);
      setChart(chartInstance.getOptions());
    },
    [config, id, analytics]
  );

  const [, doRender] = useState(true);
  useEffect(() => {
    //Forces re-rendering of chart change for pie chart
    doRender((prevState) => !prevState);
  }, [chart]);

  useEffect(() => {
    if (analytics && config) {
      const chartInstance: DHIS2Chart = getChartTypeInstance(id, analytics, config);
      setChart(chartInstance.getOptions());
    }
  }, [analytics, config, id]);

  return {
    chart,
    changeChartType,
  };
}
