

export interface ChartConfigurationProps{
    layout:{
        column:Array<string>,
        row:Array<string>,
        filter:Array<string>
    },
    currentChartType:string

}

export interface ChartConfiguration {
    renderId: string;
    type: string;
    title: string;
    subtitle: string;
    xAxisType: string[];
    yAxisType: string;
    zAxisType: string[];
    showData: boolean;
    hideTitle: boolean;
    hideSubtitle: boolean;
    hideEmptyRows: boolean;
    hideLegend: boolean;
    showLabels: boolean;
    multiAxisTypes: any[];
    cumulativeValues: boolean;
    sortOrder: number;
    percentStackedValues: boolean;
    targetLineLabel: string;
    targetLineValue: number;
    baseLineValue: number;
    baseLineLabel: string;
    legendAlign: string;
    reverseLegend: boolean;
    rangeAxisMaxValue: number;
    rangeAxisMinValue: number;
    axes: any[];
    dataSelections: any[];
    categoryRotation?: number;
  }
  
