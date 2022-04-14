import FormFieldModel from "../models/field";

export type VALUE_TYPE =
  | "INTEGER"
  | "TRUE_ONLY"
  | "TEXT"
  | "NUMBER"
  | "DATE"
  | "LONG_TEXT"
  | "LEGEND_DEFINITION"
  | "RICH_TEXT"
  | "LEGEND_MIN_MAX"
  | "NORMAL_LEGEND_MIN_MAX"
  | "LEVEL_LEGEND_MIN_MAX"
  | "MULTIPLE_FIELDS";

export type FormFieldProps = {
  valueType: VALUE_TYPE | string;
  name: string;
  label?: string;
  validations?: any;
  min?: number | string;
  max?: number | string;
  mandatory?: boolean;
  disabled?: boolean;
  multipleField?: FormFieldProps;
  multipleFields?: Array<FormFieldProps>;
  legendDefinition?: LegendDefinition;
  initialFieldCount?: number;
  optionSet?: OptionSet;
  deletable?: boolean;
  addable?: boolean;
  control?: any;
};

export type OnChange = (payload: { value: any; name: string }) => void;

export type FinalFormFieldInput = {
  onChange: OnChange;
  value?: any;
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
  error?: boolean;
  validationText?: string;
};

export type Option = {
  name: string;
  code: string;
};

export type OptionSet = {
  options: Option;
};

export type InputProps = {
  name?: string;
  input: FinalFormFieldInput;
  valueType: VALUE_TYPE | string;
  optionSet?: OptionSet;
  label?: string;
  validations?: any;
  min?: number | string;
  max?: number | string;
  mandatory?: boolean;
  disabled?: boolean;
  multipleField?: FormFieldProps | any;
  multipleFields?: Array<FormFieldModel>;
  legendDefinition?: LegendDefinition;
  initialFieldCount?: number;
  deletable?: boolean;
  addable?: boolean;
};

export type LegendDefinition = {
  id: string;
  color: string;
  name: string;
};
