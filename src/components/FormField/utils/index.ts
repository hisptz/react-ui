import { InputField, TextAreaField } from "@dhis2/ui";
import { isEmpty } from "lodash";
import React from "react";
import CustomCheckboxField from "../components/CustomCheckboxField";
import CustomSingleSelect from "../components/CustomSingleSelect";
import LegendDefinitionField from "../components/LegendDefinitionField";
import LegendMinMax from "../components/LegendMinMax";
import MultipleFieldsField from "../components/MultipleFieldsField";
import NativeInput from "../components/NativeInput";
import RichTextEditor from "../components/RichTextEditor";
import { VALUE_TYPES } from "../constants";
import { VALUE_TYPE } from "../types";


export function getField(valueType: VALUE_TYPE | string, options?: any) {

  if (!isEmpty(options)) {
    return React.forwardRef(CustomSingleSelect);
  }

  switch (valueType) {
    case VALUE_TYPES.DATE.name:
    case VALUE_TYPES.TEXT.name:
    case VALUE_TYPES.NUMBER.name:
    case VALUE_TYPES.INTEGER.name:
      return React.forwardRef(NativeInput);
    case VALUE_TYPES.LONG_TEXT.name:
      return React.forwardRef(TextAreaField);
    case VALUE_TYPES.TRUE_ONLY.name:
      return React.forwardRef(CustomCheckboxField);
    case VALUE_TYPES.LEGEND_DEFINITION.name:
      return React.forwardRef(LegendDefinitionField);
    case VALUE_TYPES.RICH_TEXT.name:
      return React.forwardRef(RichTextEditor);
    case VALUE_TYPES.LEGEND_MIN_MAX.name:
      return React.forwardRef(LegendMinMax);
    case VALUE_TYPES.MULTIPLE_FIELDS.name:
      return React.forwardRef(MultipleFieldsField);
    default:
      return React.forwardRef(InputField);
  }
}
