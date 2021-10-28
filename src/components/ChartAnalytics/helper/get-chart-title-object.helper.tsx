export function getChartTitleObject(chartConfiguration:any):any {
    if (chartConfiguration.hideTitle) {
      return null;
    }
    return {
      text: chartConfiguration.title,
      align: "left",
      style: {
        fontWeight: "500",
        fontSize: "16px",
      },
    };
  }
  