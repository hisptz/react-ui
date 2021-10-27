import PropTypes from "prop-types";
import { CalendarSpecificPeriodSelectorProps } from "./interfaces/props";
import 'styles/styles.css';
declare function CalendarSpecificPeriodSelector({ excludedPeriodTypes, calendar, onSelect, selectedPeriods, excludeFixedPeriods, excludeRelativePeriods }: CalendarSpecificPeriodSelectorProps): JSX.Element;
declare namespace CalendarSpecificPeriodSelector {
    var propTypes: {
        calendar: PropTypes.Validator<string>;
        selectedPeriods: PropTypes.Validator<any[]>;
        onSelect: PropTypes.Validator<(...args: any[]) => any>;
        excludedPeriodTypes: PropTypes.Requireable<(string | null | undefined)[]>;
    };
}
export default CalendarSpecificPeriodSelector;
