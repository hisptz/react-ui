export function getChartSeriesDataLabelsOptions(chartConfiguration:any) {
    let dataLabels = null;
  
    switch (chartConfiguration.type) {
      case "pie":
        dataLabels = {
          enabled: chartConfiguration.showData,
          format:
            "{point.name}<br/> <b>{point.y}</b> ( {point.percentage:.1f} % )",
        };
        break;
      default:
        dataLabels = {
          enabled: chartConfiguration.showData,
        };
        break;
    }
  
    return dataLabels;
  }
  