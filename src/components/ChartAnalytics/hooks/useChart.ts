import type { Analytics } from "@hisptz/dhis2-utils";
import { useCallback, useEffect, useState } from "react";
import { ChartConfiguration, ChartConfigurationProps, ChartType } from "../types/props";
import { getHighchartConfig, updateLayout } from "../utils/chart";

export function useChart({ id, analytics, config }: { id: string; analytics: Analytics; config: ChartConfigurationProps }): {
  chart?: ChartConfiguration;
  changeChartType: (type: ChartType) => void;
} {
  const [chart, setChart] = useState<ChartConfiguration | undefined>();

  const changeChartType = useCallback(
    (type: ChartType) => {
      const updatedLayout = updateLayout(config, { type });
      setChart(getHighchartConfig(id, analytics, { ...config, layout: updatedLayout, type }));
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
      setChart(getHighchartConfig(id, analytics, config));
    }
  }, [analytics, config, id]);

  return {
    chart,
    changeChartType,
  };
}
