import { SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import React from "react";
import { OnChange } from "../types";

type CustomSingleSelectProps = {
  options: Array<{ label: string; value: any }>;
  onChange: OnChange;
  value?: any;
  name: string;
  filterable?: boolean;
};

export default function CustomSingleSelect({ options, onChange, value, name, ...props }: CustomSingleSelectProps, ref: React.Ref<any>) {
  return (
    <SingleSelectField {...props} ref={ref} selected={value} onChange={({ selected }: { selected: any }) => onChange({ name, value: selected })}>
      {options?.map(({ label, value }: { label: string; value: any }) => (
        <SingleSelectOption label={label} value={value} key={value} />
      ))}
    </SingleSelectField>
  );
}
