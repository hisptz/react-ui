import PropTypes from "prop-types";
import { FormFieldProps } from "../../../../types";
import FormFieldModel from "../../models/field";
import { FinalFormFieldInput } from "../../types";
declare type MultipleFieldsFieldProps = FinalFormFieldInput & {
    multipleField: FormFieldProps;
    initialFieldCount?: number;
    multipleFields?: Array<any>;
};
declare function MultipleFieldsField({ name, value, onChange, multipleField, initialFieldCount, multipleFields, ...props }: MultipleFieldsFieldProps): JSX.Element;
declare namespace MultipleFieldsField {
    var propTypes: {
        name: PropTypes.Validator<string>;
        onChange: PropTypes.Validator<(...args: any[]) => any>;
        initialFieldCount: PropTypes.Requireable<number>;
        multipleField: PropTypes.Requireable<object>;
        multipleFields: PropTypes.Requireable<(FormFieldModel | null | undefined)[]>;
        value: PropTypes.Requireable<any>;
    };
}
export default MultipleFieldsField;
