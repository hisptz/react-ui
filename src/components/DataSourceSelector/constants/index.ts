import { DataSourceType } from "components/DataSourceSelector/types";

export const DATA_SOURCES: Array<DataSourceType> = [
  {
    label: "Indicators",
    resource: "indicators",
    groupResource: "indicatorGroups",
    dimensionItemType: "INDICATOR",
    groupKey: "indicatorGroups.id",
    type: "indicator",
    native: true,
  },
  {
    label: "Program Indicators",
    resource: "programIndicators",
    dimensionItemType: "PROGRAM_INDICATOR",
    groupKey: "program.id",
    groupResource: "programs",
    type: "programIndicator",
    native: true,
  },
  {
    label: "Data Elements",
    resource: "dataElements",
    groupResource: "dataElementGroups",
    dimensionItemType: "DATA_ELEMENT",
    groupKey: "dataElementGroups.id",
    type: "dataElement",
    native: false,
  },
  {
    label: "Data Sets",
    resource: "dataSets",
    groupResource: "",
    dimensionItemType: "",
    groupKey: "",
    type: "dataSet",
    native: false,
  },
  {
    label: "Custom Functions",
    resource: "customFunctions",
    groupResource: "",
    dimensionItemType: "",
    groupKey: "",
    type: "customFunction",
    native: false,
  },
];
export const DATASTORE_FUNCTIONS_ENDPOINT = "dataStore/functions";
