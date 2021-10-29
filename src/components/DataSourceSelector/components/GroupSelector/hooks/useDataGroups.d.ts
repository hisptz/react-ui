import DataSource from "components/DataSourceSelector/models/dataSource";
export default function useDataGroups(initialSelectedDataType: DataSource): {
    groups: Array<any>;
    loading: boolean;
    error: any;
};
