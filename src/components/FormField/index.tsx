import { ReactFinalForm } from "@dhis2/ui";
import React from "react";
import RHFInput from "./components/HookFormInput";
import Input from "./components/Input";
import { FormFieldProps } from "./types";

const { Field } = ReactFinalForm;

export default function FormField(field: FormFieldProps) {
  return <Field {...field} component={Input} />;
}

export { Input };
export { RHFInput };
