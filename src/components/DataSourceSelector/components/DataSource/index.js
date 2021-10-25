import { Field, Transfer } from "@dhis2/ui";
import { debounce, find, findIndex, uniqBy } from "lodash";
import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";
import DataSourceSearch from "../Search";
import useDataSources from "./hooks/useDataSources";

export default function DataSource({
  selectedDataSourceType,
  selectedGroup,
  onChange,
  selected,
  disabled,
}) {
  const [searchKeyword, setSearchKeyword] = useState();
  const { loading, data, error, nexPage, search } = useDataSources(
    selectedDataSourceType,
    selectedGroup
  );

  const dataSources = useMemo(() => {
    const loadedData = data || [];
    const selectedData = selected || [];
    return uniqBy([...loadedData, ...selectedData], "id");
  }, [data, selected, selectedGroup]);

  const onEndReached = () => {
    if (loading) {
      return;
    }
    nexPage();
  };

  const onSearchChange = debounce(search, 1000, { maxWait: 1500 });

  const setSearchChange = (keyword) => {
    setSearchKeyword(keyword);
    onSearchChange(keyword);
  };

  return (
    <Field error={error} validationText={error?.message}>
      <Transfer
        onEndReached={onEndReached}
        loading={loading}
        onChange={(value) => {
          onChange(
            value.selected.map((id) => {
              const selectedDataSource = find(dataSources, ["id", id]);
              return {
                ...selectedDataSource,
                type: selectedDataSourceType?.type,
              };
            })
          );
        }}
        selected={selected?.map(({ id }) => id)}
        options={
          dataSources?.map((source) => ({
            label: source.displayName,
            value: source.id,
            disabled: findIndex(disabled, (val) => val === source.id) >= 0,
          })) || []
        }
        leftHeader={
          <DataSourceSearch
            setSearchKeyword={setSearchChange}
            keyword={searchKeyword}
          />
        }
      />
    </Field>
  );
}

DataSource.propTypes = {
  disabled: PropTypes.array,
  selected: PropTypes.array,
  selectedDataSourceType: PropTypes.object,
  selectedGroup: PropTypes.object,
  onChange: PropTypes.func,
};
