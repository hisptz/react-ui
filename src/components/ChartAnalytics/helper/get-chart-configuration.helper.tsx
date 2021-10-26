/* eslint-disable max-params */
/* eslint-disable no-prototype-builtins */
import { ChartConfiguration } from "../interfaces/props";

export function getChartConfiguration(
    visualizationSettings:any,
    renderId:string,
    visualizationLayout:any,
    interventionName:string,
    customChartType:string,
    dataSelections:Array<any>
  ) :ChartConfiguration{
    const chartType = customChartType;
  
    return {
      renderId: renderId,
      type: chartType,
      title: getChartTitle(visualizationSettings, interventionName),
      subtitle: visualizationSettings.hasOwnProperty("subtitle")
        ? visualizationSettings.subtitle
        : "",
      hideTitle: visualizationSettings.hasOwnProperty("hideTitle")
        ? visualizationSettings.hideTitle
        : true,
      hideSubtitle: visualizationSettings.hasOwnProperty("hideSubtitle")
        ? visualizationSettings.hideSubtitle
        : false,
      showData: visualizationSettings.hasOwnProperty("showData")
        ? visualizationSettings.showData
        : true,
      hideEmptyRows: visualizationSettings.hasOwnProperty("hideEmptyRows")
        ? visualizationSettings.hideEmptyRows
        : true,
      hideLegend: visualizationSettings.hasOwnProperty("hideLegend")
        ? visualizationSettings.hideLegend
        : true,
      cumulativeValues: visualizationSettings.hasOwnProperty("cumulativeValues")
        ? visualizationSettings.cumulativeValues
        : false,
      targetLineValue: visualizationSettings.targetLineValue
        ? visualizationSettings.targetLineValue
        : undefined,
      targetLineLabel: visualizationSettings.targetLineLabel
        ? visualizationSettings.targetLineLabel
        : "",
      baseLineValue: visualizationSettings.baseLineValue
        ? visualizationSettings.baseLineValue
        : undefined,
      baseLineLabel: visualizationSettings.baseLineLabel
        ? visualizationSettings.baseLineLabel
        : "",
      legendAlign: "bottom",
      categoryRotation: 0,
      reverseLegend: false,
      showLabels: true,
      axes: visualizationSettings.axes ? visualizationSettings.axes : [],
      rangeAxisMaxValue: 90,
      rangeAxisMinValue: visualizationSettings.rangeAxisMinValue
        ? visualizationSettings.rangeAxisMinValue
        : undefined,
      sortOrder: visualizationSettings.hasOwnProperty("sortOrder")
        ? visualizationSettings.sortOrder
        : 0,
      percentStackedValues: visualizationSettings.hasOwnProperty(
        "percentStackedValues"
      )
        ? visualizationSettings.percentStackedValues
        : true,
      multiAxisTypes: visualizationSettings.hasOwnProperty("selectedChartTypes")
        ? visualizationSettings.selectedChartTypes
        : [],
      xAxisType: visualizationLayout.row,
      yAxisType: visualizationLayout.column,
      zAxisType: visualizationLayout.filter,
      dataSelections,
    };
  }
  
  function getChartTitle(favoriteObject:any, interventionName:string) {
    return `${
      favoriteObject.title || favoriteObject.displayName || favoriteObject.name
    }${interventionName ? ` : ${interventionName}` : ""}`;
  }
  