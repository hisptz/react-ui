import PropTypes from "prop-types";
import { DataSourceProps } from "../../types";
declare function DataSource({ selectedDataSourceType, selectedGroup, onChange, selected, disabled, maxSelections }: DataSourceProps): JSX.Element;
declare namespace DataSource {
    var propTypes: {
        disabled: PropTypes.Requireable<any[]>;
        selected: PropTypes.Requireable<any[]>;
        selectedDataSourceType: PropTypes.Requireable<object>;
        selectedGroup: PropTypes.Requireable<object>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
    };
}
export default DataSource;
