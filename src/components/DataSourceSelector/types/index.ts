import DataSource from "components/DataSourceSelector/models/dataSource";

type dataSource = "indicator" | "programIndicator" | "dataSet" | "dataElement" | "customFunction";
export type DataSourceType = {
  label: string;
  resource: string;
  type: string;
  groupResource?: string;
  dimensionItemType?: string;
  groupKey?: string;
  native?: boolean;
  filterType?: string;
};

export type DataSourceSelectorProps = {
  dataSources?: dataSource[];
  onSubmit: (data: any) => void;
  disabled?: Array<string>;
  maxSelections?: number | string;
};

export type Pager = {
  pageCount: number;
};

export type DataSourceResponse = {
  data: Array<any> | undefined;
  pager?: Pager;
};

export type DataSourceProps = {
  selectedDataSourceType: DataSource;
  selectedGroup?: { id: string };
  onChange: (value: Array<any>) => void;
  selected: Array<any>;
  disabled?: Array<string>;
  maxSelections?: number | string;
};

export type GroupSelectorProps = {
  selectedDataType: DataSource;
  onSelect: (value: any) => void;
  selectedGroup?: { id: string };
};
