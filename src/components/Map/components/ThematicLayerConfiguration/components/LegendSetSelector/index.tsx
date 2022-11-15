import { useDataQuery } from "@dhis2/app-runtime";
import React, { useMemo } from "react";
import { LegendSet } from "@hisptz/dhis2-utils";
import { SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { isEmpty } from "lodash";

const legendSetQuery = {
  legendSets: {
    resource: "legendSets",
    params: {
      fields: ["displayName", "id"],
    },
  },
};

export function LegendSetSelector({
  selected,
  onChange,
  error,
  required,
  ...props
}: {
  selected?: string;
  onChange: (value: string) => void;
  error?: { message?: string };
  required?: boolean;
}) {
  const { loading, data } = useDataQuery(legendSetQuery);
  const options = useMemo(() => {
    if (data) {
      return (data?.legendSets as { legendSets?: LegendSet[] })?.legendSets?.map(({ displayName, id }) => ({
        label: displayName,
        value: id,
      }));
    }
    return [];
  }, [data]);

  return (
    <SingleSelectField
      required={required}
      error={Boolean(error)}
      validationText={error?.message}
      {...props}
      label={i18n.t("Legend set")}
      filterable
      selected={!isEmpty(options) ? selected : undefined}
      loadingText={i18n.t("Please wait...")}
      onChange={({ selected }: { selected: string }) => onChange(selected)}
      loading={loading}>
      {options?.map(({ label, value }) => (
        <SingleSelectOption key={`${label}-legend-option`} label={label} value={value} />
      ))}
    </SingleSelectField>
  );
}
