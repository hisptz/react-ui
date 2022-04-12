import { Field } from "@dhis2/ui";
import JoditEditor from "jodit-react";
import React from "react";
import { FinalFormFieldInput } from "../../types";

export default function RichTextEditor({
                                         name,
                                         label,
                                         value,
                                         onChange,
                                         ...props
                                       }: FinalFormFieldInput, ref: React.Ref<any>) {
  const config = {
    readonly: false,
    defaultFontSizePoints: "pt"
  };
  return (
    <Field {...props} name={name} label={label} value={value?.value}>
      <JoditEditor ref={ref} value={value} onBlur={(newValue: any) => onChange({ name, value: newValue })}
                   config={config} />
    </Field>
  );
}
