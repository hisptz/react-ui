import { SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import React, { useMemo } from "react";
import { OnChange } from "../types";

type CustomSingleSelectProps = {
  options: Array<{ label: string; value: any }>;
  onChange: OnChange;
  value?: any;
  name: string;
  filterable?: boolean;
};

export default function CustomSingleSelect({ options, onChange, value, name, ...props }: CustomSingleSelectProps, ref: React.Ref<any>) {
  const selectedValue = useMemo(() => {
    if (value) {
      return options.find((option) => option.value === value)?.value ?? "";
    }
    return "";
  }, [options, value]);

  return (
    <SingleSelectField {...props} ref={ref} selected={selectedValue} onChange={({ selected }: { selected: any }) => onChange({ name, value: selected })}>
      {options?.map(({ label, value }: { label: string; value: any }) => (
        <SingleSelectOption label={label} value={value} key={value} />
      ))}
    </SingleSelectField>
  );
}
