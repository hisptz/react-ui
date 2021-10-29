import PropTypes from "prop-types";
import { DataSourceSelectorProps } from "components/DataSourceSelector/types";
import "styles/styles.css";
declare function DataSourceSelector({ onSubmit, disabled, dataSources, maxSelections }: DataSourceSelectorProps): JSX.Element;
declare namespace DataSourceSelector {
    var propTypes: {
        onSubmit: PropTypes.Validator<(...args: any[]) => any>;
        disabled: PropTypes.Requireable<any[]>;
    };
}
export default DataSourceSelector;
