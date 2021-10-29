import PropTypes from "prop-types";
import { FinalFormFieldInput } from "components/FormField/components/Input/types";
declare function CustomCheckboxField({ name, value, onChange, ...props }: FinalFormFieldInput): JSX.Element;
declare namespace CustomCheckboxField {
    var propTypes: {
        name: PropTypes.Validator<string>;
        onChange: PropTypes.Validator<(...args: any[]) => any>;
        value: PropTypes.Requireable<any>;
    };
}
export default CustomCheckboxField;
