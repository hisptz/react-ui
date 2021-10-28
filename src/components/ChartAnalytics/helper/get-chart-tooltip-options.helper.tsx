import { getAllowedChartType } from "./get-allowed-chart-types.helper";

export function getTooltipOptions(chartConfiguration:any) {
  const tooltipChartType = getAllowedChartType(chartConfiguration.type);
  let tooltipObject = {};

  if (tooltipChartType) {
    switch (tooltipChartType) {
      case "solidgauge":
        tooltipObject = {
          enabled: false,
        };
        break;
      case "pie":
        tooltipObject = {
          pointFormat:
            "{series.name}<br/> <b>{point.y}</b> ( {point.percentage:.1f} % )",
        };
        break;
      default:
        switch (chartConfiguration.type) {
          case "stacked_column":
            tooltipObject = {
              headerFormat: "<b>{point.x}</b><br/>",
              pointFormat:
                "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
            };
            break;
          default:
            tooltipObject = {
              enabled: true,
            };
            break;
        }
        break;
    }
  }
  return tooltipObject;
}
