import { CheckboxField } from "@dhis2/ui";
import React from "react";
import { FinalFormFieldInput } from "../types";

export interface CustomCheckboxFieldProps extends FinalFormFieldInput {
  trueOnly?: boolean;
}

export function TrueOnlyField(props: FinalFormFieldInput) {
  return <CustomCheckboxField {...props} trueOnly />;
}

export default function CustomCheckboxField({ name, value, onChange, trueOnly, ...props }: CustomCheckboxFieldProps, ref: React.Ref<any>) {
  return (
    <CheckboxField
      ref={ref}
      {...props}
      checked={Boolean(value)}
      onChange={({ checked }: { checked: boolean }) => {
        if (trueOnly) {
          onChange({
            value: checked ? checked : undefined,
            name,
          });
        } else {
          onChange({
            value: checked,
            name,
          });
        }
      }}
    />
  );
}
