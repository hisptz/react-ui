import PropTypes from "prop-types";
import { OrgUnitSelectorProps } from "components/OrgUnitSelector/types";
import "styles/styles.css";
import "../styles/styles.css";
declare function OrgUnitSelector({ value, onUpdate, showLevels, showUserOptions, showGroups, singleSelection }: OrgUnitSelectorProps): JSX.Element;
declare namespace OrgUnitSelector {
    var propTypes: {
        value: PropTypes.Validator<object>;
        showGroups: PropTypes.Requireable<boolean>;
        showLevels: PropTypes.Requireable<boolean>;
        showUserOptions: PropTypes.Requireable<boolean>;
        onUpdate: PropTypes.Requireable<(...args: any[]) => any>;
    };
}
export default OrgUnitSelector;
