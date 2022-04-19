import { ChartConfiguration } from "../types/props";

export function getChartConfiguration({
  renderId,
  dataSelections,
  visualizationSettings,
  visualizationLayout,
  customChartType,
  interventionName,
}: {
  visualizationSettings?: any;
  renderId: string;
  visualizationLayout?: any;
  interventionName: string;
  customChartType: string;
  dataSelections: Array<any>;
}): ChartConfiguration {
  return {
    renderId: renderId,
    type: customChartType,
    title: getChartTitle(visualizationSettings, interventionName),
    subtitle: visualizationSettings?.subtitle ?? "",
    hideTitle: visualizationSettings.hideTitle ?? true,
    hideSubtitle: visualizationSettings.hideSubtitle ?? false,
    showData: visualizationSettings.showData ?? true,
    hideEmptyRows: visualizationSettings.hideEmptyRows ?? true,
    hideLegend: visualizationSettings.hideLegend ?? true,
    cumulativeValues: visualizationSettings.cumulativeValues ?? false,
    targetLineValue: visualizationSettings.targetLineValue ? visualizationSettings.targetLineValue : undefined,
    targetLineLabel: visualizationSettings.targetLineLabel ? visualizationSettings.targetLineLabel : "",
    baseLineValue: visualizationSettings.baseLineValue ? visualizationSettings.baseLineValue : undefined,
    baseLineLabel: visualizationSettings.baseLineLabel ? visualizationSettings.baseLineLabel : "",
    legendAlign: "bottom",
    categoryRotation: 0,
    reverseLegend: false,
    showLabels: true,
    axes: visualizationSettings.axes ? visualizationSettings.axes : [],
    rangeAxisMaxValue: 90,
    rangeAxisMinValue: visualizationSettings.rangeAxisMinValue ? visualizationSettings.rangeAxisMinValue : undefined,
    sortOrder: visualizationSettings.sortOrder ?? 0,
    percentStackedValues: visualizationSettings.percentStackedValues ?? true,
    multiAxisTypes: visualizationSettings.selectedChartTypes ?? [],
    xAxisType: visualizationLayout.row,
    yAxisType: visualizationLayout.column,
    zAxisType: visualizationLayout.filter,
    dataSelections,
  };
}

function getChartTitle(favoriteObject: any, interventionName: string) {
  return `${favoriteObject?.title || favoriteObject?.displayName || favoriteObject?.name}${interventionName ? ` : ${interventionName}` : ""}`;
}
