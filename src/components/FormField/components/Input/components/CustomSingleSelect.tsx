import { SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import React from "react";
import { OnChange } from "components/FormField/components/Input/types";

type CustomSingleSelectProps = {
  options: Array<{ label: string; value: any }>;
  onChange: OnChange;
  value: any;
  name: string;
};

export default function CustomSingleSelect({ options, onChange, value, name, ...props }: CustomSingleSelectProps) {
  return (
    <SingleSelectField selected={value} onChange={({ selected }: { selected: any }) => onChange({ name, value: selected })} {...props}>
      {options?.map(({ label, value }: { label: string; value: any }) => (
        <SingleSelectOption label={label} value={value} key={value} />
      ))}
    </SingleSelectField>
  );
}
