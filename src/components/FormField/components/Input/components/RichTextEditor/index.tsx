/* eslint-disable import/no-unresolved */
import { Field } from "@dhis2/ui";
import JoditEditor from "jodit-react";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { FinalFormFieldInput } from "components/FormField/components/Input/types";

export default function RichTextEditor({ name, label, value, onChange, ...props }: FinalFormFieldInput) {
  const editorRef = useRef(null);
  const config = {
    readonly: false,
    defaultFontSizePoints: "pt",
  };
  return (
    <Field name={name} label={label} value={value?.value} {...props}>
      <JoditEditor ref={editorRef} value={value} onBlur={(newValue: any) => onChange({ name, value: newValue })} config={config} />
    </Field>
  );
}

RichTextEditor.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
};
