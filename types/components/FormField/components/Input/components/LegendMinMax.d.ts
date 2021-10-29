import PropTypes from "prop-types";
import { FinalFormFieldInput, LegendDefinition } from "../types";
declare type LegendMinMaxProps = FinalFormFieldInput & {
    legendDefinition: LegendDefinition;
};
declare function LegendMinMax({ name, value, onChange, legendDefinition }: LegendMinMaxProps): JSX.Element;
declare namespace LegendMinMax {
    var propTypes: {
        name: PropTypes.Validator<string>;
        onChange: PropTypes.Validator<(...args: any[]) => any>;
        legendDefinition: PropTypes.Requireable<object>;
        value: PropTypes.Requireable<any>;
    };
}
export default LegendMinMax;
