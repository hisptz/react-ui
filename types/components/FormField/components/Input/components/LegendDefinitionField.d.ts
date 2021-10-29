import PropTypes from "prop-types";
import { FinalFormFieldInput } from "../../Input/types";
import "../styles/style.css";
declare function LegendDefinitionField({ name, label, value, onChange }: FinalFormFieldInput): JSX.Element;
declare namespace LegendDefinitionField {
    var propTypes: {
        name: PropTypes.Validator<string>;
        onChange: PropTypes.Validator<(...args: any[]) => any>;
        label: PropTypes.Requireable<string>;
        value: PropTypes.Requireable<object>;
    };
}
export default LegendDefinitionField;
