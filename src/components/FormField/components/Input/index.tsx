import { CssReset } from "@dhis2/ui";
import { map } from "lodash";
import React, { useMemo } from "react";
import { VALUE_TYPES } from "../../constants";
import { InputProps, Option } from "../../types";
import { getField } from "../../utils";
import CustomSingleSelect from "../CustomSingleSelect";
import "../../styles/style.css";

export default function Input({ input, valueType, optionSet, ...props }: InputProps) {
  const type = useMemo(() => VALUE_TYPES[valueType].formName, [valueType]);
  const options = map(optionSet?.options, ({ name, code }: Option) => ({
    label: name,
    value: code,
  }));
  const Input = useMemo(() => {
    if (optionSet && optionSet.options) {
      return CustomSingleSelect;
    } else {
      return getField(valueType);
    }
  }, [optionSet, valueType]);
  const onChange = input.onChange;

  return (
    <div className={"field-container"}>
      <CssReset />
      <Input {...input} {...props} type={type} options={options} onChange={({ value }: { value: any }) => onChange(value)} />
    </div>
  );
}
