import { find } from "lodash";
import { ChartConfiguration } from "../types/props";

export function getXAxisItemsFromChartConfiguration(chartConfiguration:ChartConfiguration) {
  return (chartConfiguration ? chartConfiguration.xAxisType : []).map(
    (xAxisDimension:string) => {
      const dataSelection = find(
        chartConfiguration ? chartConfiguration.dataSelections : [],
        ["dimension", xAxisDimension === "groups" ? "dx" : xAxisDimension]
      );
      return dataSelection
        ? xAxisDimension === "groups"
          ? dataSelection.groups
          : dataSelection.items
        : [];
    }
  );
}
