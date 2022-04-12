import { CheckboxField } from "@dhis2/ui";
import React from "react";
import { FinalFormFieldInput } from "../types";

export default function CustomCheckboxField({
                                              name,
                                              value,
                                              onChange,
                                              ...props
                                            }: FinalFormFieldInput, ref: React.Ref<any>) {
  return <CheckboxField ref={ref} {...props} checked={Boolean(value)}
                        onChange={({ checked }: { checked: boolean }) => onChange({ value: checked, name })} />;
}
