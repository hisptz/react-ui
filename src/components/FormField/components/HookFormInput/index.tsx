import { CssReset } from "@dhis2/ui";
import { map } from "lodash";
import React, { useMemo } from "react";
import { Controller } from "react-hook-form";
import { VALUE_TYPES } from "../../constants";
import { FormFieldProps, Option } from "../../types";
import { getField } from "../../utils";

export default function RHFInput({ valueType, name, validations, optionSet, mandatory, ...props }: FormFieldProps) {
  const type = useMemo(() => VALUE_TYPES[valueType].formName, [valueType]);
  const options = map(optionSet?.options, ({ name, code }: Option) => ({
    label: name,
    value: code,
  }));

  const Input = useMemo(() => getField(valueType), [valueType]);

  return (
    <div className={"field-container"}>
      <CssReset />
      <Controller
        name={name}
        rules={validations}
        render={({ field, fieldState }) => {
          return (
            <Input
              {...props}
              {...field}
              options={options}
              type={type}
              required={mandatory}
              error={fieldState.error}
              validationText={fieldState.error?.message}
              onChange={({ value }: { value: any }) => field.onChange(value)}
            />
          );
        }}
      />
    </div>
  );
}
