import { SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import { find, isEmpty } from "lodash";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import useDataGroups from "./hooks/useDataGroups";

export default function GroupSelector({
  selectedDataType,
  onSelect,
  selectedGroup,
}) {
  const { loading, groups, error } = useDataGroups(selectedDataType);
  const disabled = useMemo(
    () =>
      isEmpty(selectedDataType) ||
      (isEmpty(selectedDataType.groupResource) &&
        selectedDataType.type !== "customFunction"),
    [selectedDataType.groupResource, groups, loading]
  );

  return (
    <div className="pb-8">
      <SingleSelectField
        clearable
        selected={selectedGroup?.id}
        onChange={({ selected: newValue }) => {
          const selectedGroup = find(groups, ["id", newValue]);
          onSelect(selectedGroup);
        }}
        error={error}
        validationText={error?.message}
        loading={loading}
        disabled={disabled}
        label={
          selectedDataType.groupResource === "programs"
            ? "Select Program"
            : "Select Group"
        }
      >
        {groups?.map(({ displayName, id }) => {
          return <SingleSelectOption key={id} value={id} label={displayName} />;
        })}
      </SingleSelectField>
    </div>
  );
}

GroupSelector.propTypes = {
  selectedDataType: PropTypes.object,
  selectedGroup: PropTypes.object,
  onSelect: PropTypes.func,
};
