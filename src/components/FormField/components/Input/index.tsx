import { CssReset, InputField, TextAreaField } from "@dhis2/ui";
import { map } from "lodash";
import React, { useMemo } from "react";
import CustomCheckboxField from "components/FormField/components/Input/components/CustomCheckboxField";
import CustomSingleSelect from "components/FormField/components/Input/components/CustomSingleSelect";
import LegendDefinitionField from "components/FormField/components/Input/components/LegendDefinitionField";
import LegendMinMax from "components/FormField/components/Input/components/LegendMinMax";
import MultipleFieldsField from "components/FormField/components/Input/components/MultipleFieldsField";
import RichTextEditor from "components/FormField/components/Input/components/RichTextEditor";
import { InputProps, Option } from "components/FormField/components/Input/types";
import { VALUE_TYPES } from "components/FormField/constants";
import "./styles/style.css";

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
      switch (valueType) {
        case VALUE_TYPES.DATE.name:
        case VALUE_TYPES.TEXT.name:
        case VALUE_TYPES.NUMBER.name:
        case VALUE_TYPES.INTEGER.name:
          return InputField;
        case VALUE_TYPES.LONG_TEXT.name:
          return TextAreaField;
        case VALUE_TYPES.TRUE_ONLY.name:
          return CustomCheckboxField;
        case VALUE_TYPES.LEGEND_DEFINITION.name:
          return LegendDefinitionField;
        case VALUE_TYPES.RICH_TEXT.name:
          return RichTextEditor;
        case VALUE_TYPES.LEGEND_MIN_MAX.name:
          return LegendMinMax;
        case VALUE_TYPES.MULTIPLE_FIELDS.name:
          return MultipleFieldsField;
        default:
          return InputField;
      }
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
