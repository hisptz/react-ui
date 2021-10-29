import { ReactFinalForm } from "@dhis2/ui";
import React from "react";
import Input from "components/FormField/components/Input";
import { FormFieldProps } from "components/FormField/types";

const { Field } = ReactFinalForm;

export default function FormField(field: FormFieldProps) {
  return <Field {...field} component={Input} />;
}

export { Input };
