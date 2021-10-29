import DataSource from "components/DataSourceSelector/models/dataSource";
declare type dataSource = "indicator" | "programIndicator" | "dataSet" | "dataElement" | "customFunction";
export declare type DataSourceType = {
    label: string;
    resource: string;
    type: string;
    groupResource?: string;
    dimensionItemType?: string;
    groupKey?: string;
    native?: boolean;
    filterType?: string;
};
export declare type DataSourceSelectorProps = {
    dataSources?: dataSource[];
    onSubmit: (data: any) => void;
    disabled?: Array<string>;
    maxSelections?: number | string;
};
export declare type Pager = {
    pageCount: number;
};
export declare type DataSourceResponse = {
    data: Array<any> | undefined;
    pager?: Pager;
};
export declare type DataSourceProps = {
    selectedDataSourceType: DataSource;
    selectedGroup?: {
        id: string;
    };
    onChange: (value: Array<any>) => void;
    selected: Array<any>;
    disabled?: Array<string>;
    maxSelections?: number | string;
};
export declare type GroupSelectorProps = {
    selectedDataType: DataSource;
    onSelect: (value: any) => void;
    selectedGroup?: {
        id: string;
    };
};
export {};
