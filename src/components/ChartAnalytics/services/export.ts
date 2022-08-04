import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighChartsExportCSV from "highcharts/modules/export-data";
import HighChartsExport from "highcharts/modules/exporting";
import HighChartsFullScreen from "highcharts/modules/full-screen";

export function setupHighchartsModules(highcharts: typeof Highcharts) {
  HighChartsExport(highcharts);
  HighChartsExportCSV(highcharts);
  HighChartsFullScreen(highcharts);
}

export function onFullScreenView(chartRef: HighchartsReact.RefObject, options?: Highcharts.Options) {
  chartRef?.chart?.fullscreen.toggle();
}

export function onPDFDownload(chartRef: HighchartsReact.RefObject, options?: Highcharts.Options) {
  chartRef?.chart.exportChart({ type: "application/pdf" }, options ?? {});
}

export function onCSVDownload(chartRef: HighchartsReact.RefObject, options?: Highcharts.Options) {
  chartRef?.chart.downloadCSV();
}

export const onImageDownload = (chartRef: HighchartsReact.RefObject, type: "png" | "svg+xml" | "jpeg", options?: Highcharts.Options) => {
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
