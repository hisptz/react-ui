export function getAllowedChartType(chartType: string): string {
  const splitChartType: any[] = chartType.split("_");
  let newChartType = "";
  switch (chartType) {
    case "radar":
      newChartType = "line";
      break;
    case "dotted":
      newChartType = "line";
      break;
    default:
      newChartType = splitChartType.length > 1 ? splitChartType[1] : splitChartType[0];
      break;
  }
  return newChartType;
}
