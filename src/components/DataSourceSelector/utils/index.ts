import { compact, find, isArray, isEmpty, map } from "lodash";
import { DATA_SOURCES } from "../constants";
import CustomFunctions from "../models/customFunctions";
import DataElements from "../models/dataElements";
import DataSets from "../models/dataSets";
import DataSourceModel from "../models/dataSource";
import NativeDataSource from "../models/nativeDataSource";
import { DataSourceType } from "../types";

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
