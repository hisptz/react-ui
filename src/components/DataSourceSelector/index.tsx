import { Chip, CssReset } from "@dhis2/ui";
import { head } from "lodash";
import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";
import DataSourceModel from "./models/dataSource";
import { getDataSourcesList } from "./utils";
import DataSource from "components/DataSourceSelector/components/DataSource";
import GroupSelector from "components/DataSourceSelector/components/GroupSelector";
import { DATA_SOURCES } from "components/DataSourceSelector/constants";
import NativeDataSource from "components/DataSourceSelector/models/nativeDataSource";
import { DataSourceSelectorProps } from "components/DataSourceSelector/types";
import "styles/styles.css";
export default function DataSourceSelector({ onSubmit, disabled, dataSources, maxSelections }: DataSourceSelectorProps) {
  const dataSourcesList = useMemo(() => getDataSourcesList(dataSources), [dataSources]);
  const [selectedDataSourceType, setSelectedDataSourceType] = useState<DataSourceModel>(head(dataSourcesList) ?? new NativeDataSource(DATA_SOURCES[0]));
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedDataSources, setSelectedDataSources] = useState<Array<any>>([]);
  const onGroupChange = (group: React.SetStateAction<undefined>) => {
    setSelectedGroup(group);
  };

  const onDataSourceSelect = (selected: Array<any>) => {
    setSelectedDataSources(selected);
    onSubmit(selected);
  };

  const onDataSourceTypeChange = (sourceType: DataSourceModel) => {
    setSelectedGroup(undefined);
    setSelectedDataSourceType(sourceType);
  };

  return (
    <div className="start">
      <CssReset />
      <div className="container-bordered column">
        <div className="row p-8 wrap">
          {dataSourcesList.length > 1 &&
            dataSourcesList?.map((source) => (
              <Chip onClick={() => onDataSourceTypeChange(source)} selected={selectedDataSourceType?.label === source.label} key={`chip-${source.label}`}>
                {source.label}
              </Chip>
            ))}
        </div>
        <div className="column p-16">
          <GroupSelector selectedGroup={selectedGroup} onSelect={onGroupChange} selectedDataType={selectedDataSourceType} />
          <div className="pt-16">
            <DataSource
              maxSelections={maxSelections}
              disabled={disabled}
              selected={selectedDataSources}
              onChange={onDataSourceSelect}
              selectedGroup={selectedGroup}
              selectedDataSourceType={selectedDataSourceType}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
DataSourceSelector.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.array,
};
