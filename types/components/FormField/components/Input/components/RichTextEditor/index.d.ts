import PropTypes from "prop-types";
import { FinalFormFieldInput } from "components/FormField/components/Input/types";
declare function RichTextEditor({ name, label, value, onChange, ...props }: FinalFormFieldInput): JSX.Element;
declare namespace RichTextEditor {
    var propTypes: {
        name: PropTypes.Validator<string>;
        onChange: PropTypes.Validator<(...args: any[]) => any>;
        label: PropTypes.Requireable<string>;
        value: PropTypes.Requireable<any>;
    };
}
export default RichTextEditor;
