export const dataTypes = {
  DATA_ELEMENT: "dataElement",
  PROGRAM_INDICATOR: "programIndicator",
  PROGRAM_DATA_ELEMENT: "programDataElement",
  DATASET_REPORTING_RATES: "dataSet",
  ATTRIBUTES: "attribute",
  CONSTANTS: "constant",
  VARIABLE: "variable",
  ORG_UNIT_COUNT: "orgUnitCount",
  UNDEFINED: "undefined",
};

export const dataSourceTypes = {
  INDICATOR: "indicator",
  DATA_ELEMENT: "dataElement",
  PROGRAM_INDICATOR: "programIndicator",
  DATA_ELEMENT_GROUP: "dataElementGroup",
  INDICATOR_GROUP: "indicatorGroup",
  FUNCTION: "customFunction",
  DATASET: "dataSet",
  PROGRAM_DATA_ELEMENT: "dataElement",
};

export const dataElementDomainTypes = {
  TRACKER: "TRACKER",
  AGGREGATE: "AGGREGATE",
  UNDEFINED: "undefined",
};

export const analyticsTypes = {
  EVENT: "EVENT",
  ENROLLMENT: "ENROLLMENT",
};

export const dataTypesInitials = {
  DATA_ELEMENT: "#{",
  PROGRAM_DATA_ELEMENT: "D{",
  PROGRAM_INDICATOR: "I{",
  DATASET_REPORTING_RATES: "R{",
  ATTRIBUTES: "A{",
  CONSTANTS: "C{",
  VARIABLE: "V{",
  ORG_UNIT_COUNT: "OUG{",
};

export interface DictionaryValue {
  values?: {
    dataElements: any;
    programIndicators: any;
    dataSetReportingRates: any;
    attributes: any;
    constants: any;
    programDtElement: any;
    orgUnitCount: any;
  };
  setValues: (values: any) => void;
}

export interface CountValue {
  values?: {
    dataSetCount: any;
    programCount: any;
  };
  setValues: (values: any) => void;
}
