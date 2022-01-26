import { InputField, TextAreaField } from "@dhis2/ui";
import CustomCheckboxField from "../components/CustomCheckboxField";
import LegendDefinitionField from "../components/LegendDefinitionField";
import LegendMinMax from "../components/LegendMinMax";
import MultipleFieldsField from "../components/MultipleFieldsField";
import RichTextEditor from "../components/RichTextEditor";
import { VALUE_TYPES } from "../constants";
import { VALUE_TYPE } from "../types";

export function getField(valueType: VALUE_TYPE) {
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
