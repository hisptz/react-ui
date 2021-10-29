import { LegendDefinition, OptionSet } from "../components/Input/types";
export declare type FormFieldProps = {
    valueType: string;
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
    optionSet?: OptionSet;
};
