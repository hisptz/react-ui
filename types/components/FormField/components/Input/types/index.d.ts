import FormFieldModel from "components/FormField/components/Input/models/field";
export declare type OnChange = (payload: {
    value: any;
    name: string;
}) => void;
export declare type FinalFormFieldInput = {
    onChange: OnChange;
    value?: any;
    name: string;
    label?: string;
};
export declare type Option = {
    name: string;
    code: string;
};
export declare type OptionSet = {
    options: Option;
};
export declare type InputProps = {
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
export declare type LegendDefinition = {
    id: string;
    color: string;
    name: string;
};
