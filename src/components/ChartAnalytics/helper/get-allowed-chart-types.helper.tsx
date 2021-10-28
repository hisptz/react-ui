export function getAllowedChartType(chartType: string): string {
    let newChartType = '';
    switch (chartType) {
      case 'radar':
        newChartType = 'line';
        break;
      case 'dotted':
        newChartType = 'line';
        break;
      default:
        // eslint-disable-next-line no-case-declarations
        const splitedChartType: any[] = chartType.split('_');
        newChartType =
          splitedChartType.length > 1 ? splitedChartType[1] : splitedChartType[0];
        break;
    }
    return newChartType;
  }
  