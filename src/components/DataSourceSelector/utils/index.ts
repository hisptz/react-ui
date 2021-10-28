import { compact, find, isArray, isEmpty, map } from "lodash";
import { DATA_SOURCES } from "components/DataSourceSelector/constants";
import CustomFunctions from "components/DataSourceSelector/models/customFunctions";
import DataElements from "components/DataSourceSelector/models/dataElements";
import DataSets from "components/DataSourceSelector/models/dataSets";
import DataSourceModel from "components/DataSourceSelector/models/dataSource";
import NativeDataSource from "components/DataSourceSelector/models/nativeDataSource";
import { DataSourceType } from "components/DataSourceSelector/types";

export function getDataSourcesList(dataSourcesConfig?: Array<string>): Array<DataSourceModel> {
  if (isArray(dataSourcesConfig) && !isEmpty(dataSourcesConfig)) {
    return compact(
      map(dataSourcesConfig, (dataSourceType) => {
        const dataSourceConfig: DataSourceType | undefined = find(DATA_SOURCES, ["type", dataSourceType]);
        if (dataSourceConfig) {
          if (dataSourceConfig.native) {
            return new NativeDataSource(dataSourceConfig);
          }
          if (dataSourceConfig.type === "dataElement") {
            return new DataElements(dataSourceConfig);
          }
          if (dataSourceConfig.type === "customFunction") {
            return new CustomFunctions(dataSourceConfig);
          }
          if (dataSourceConfig.type === "dataSet") {
            return new DataSets(dataSourceConfig);
          }
        }
      })
    );
  }
  return [];
}
