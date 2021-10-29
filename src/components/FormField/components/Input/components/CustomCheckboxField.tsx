import { CheckboxField } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";
import { FinalFormFieldInput } from "components/FormField/components/Input/types";

export default function CustomCheckboxField({ name, value, onChange, ...props }: FinalFormFieldInput) {
  return <CheckboxField {...props} checked={Boolean(value)} onChange={({ checked }: { checked: boolean }) => onChange({ value: checked, name })} />;
}

CustomCheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
};
