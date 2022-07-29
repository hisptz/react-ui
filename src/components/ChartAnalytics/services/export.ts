import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export function onPDFDownload(chartRef: HighchartsReact.RefObject, options?: Highcharts.Options) {
  chartRef?.chart.exportChart({ type: "application/pdf" }, options ?? {});
}

export function onCSVDownload(chartRef: HighchartsReact.RefObject, options?: Highcharts.Options) {}

export const onImageDownload = (chartRef: HighchartsReact.RefObject, type: "png" | "svg+xml" | "jpeg", options?: Highcharts.Options) => {
  console.log(chartRef);
  chartRef?.chart.exportChart({ type: `image/${type}` }, options ?? {});
};

export const onViewAsTable = (chartRef: HighchartsReact.RefObject, show: boolean) => {
  const options = chartRef?.chart.options;
  chartRef?.chart?.update({
    ...options,
    exporting: {
      ...options?.exporting,
      showTable: show,
    },
  });
};
