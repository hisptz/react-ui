import FormFieldModel from "components/FormField/components/Input/models/field";

export type OnChange = (payload: { value: any; name: string }) => void;

export type FinalFormFieldInput = {
  onChange: OnChange;
  value?: any;
  name: string;
  label?: string;
};

export type Option = {
  name: string;
  code: string;
};

export type OptionSet = {
  options: Option;
};

export type InputProps = {
  input: FinalFormFieldInput;
  valueType: string;
  optionSet?: OptionSet;
  label?: string;
  validations?: any;
  min?: number | string;
  max?: number | string;
  mandatory?: boolean;
  disabled?: boolean;
  multipleField?: InputProps;
  multipleFields?: Array<FormFieldModel>;
  legendDefinition?: LegendDefinition;
  initialFieldCount?: number;
};

export type LegendDefinition = {
  id: string;
  color: string;
  name: string;
};
