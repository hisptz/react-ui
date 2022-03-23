import { DevTool } from "@hookform/devtools";
import { Story } from "@storybook/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import RHFInput from "./components/HookFormInput";
import { VALUE_TYPES } from "./constants";
import { FormFieldProps } from "./types";
import { Input } from "./index";

const Template: Story<FormFieldProps> = (args) => <RHFInput {...args} />;

export const NativeInputs = Template.bind({});
NativeInputs.args = {
  valueType: VALUE_TYPES.TEXT.name,
  label: "Text",
  name: "text",
  mandatory: true,
};

export const LegendDefinitionInput = Template.bind({});
LegendDefinitionInput.args = {
  valueType: VALUE_TYPES.LEGEND_DEFINITION.name,
  label: "Legend Definition",
  name: "legendDefinition",
  mandatory: true,
};

export const LegendMinMax = Template.bind({});
LegendMinMax.args = {
  valueType: VALUE_TYPES.LEGEND_MIN_MAX.name,
  label: "Legend Min Max",
  name: "legendMinMax",
  legendDefinition: { name: "Target Reached", id: "legend-defn-id", color: "#147e14" },
  mandatory: true,
};

export const MultipleFields = Template.bind({});
MultipleFields.args = {
  name: "multipleFields",
  valueType: VALUE_TYPES.MULTIPLE_FIELDS.name,
  multipleField: {
    valueType: VALUE_TYPES.LEGEND_DEFINITION.name,
    name: "legendDefinition",
  },
  deletable: false,
  addable: false,
  initialFieldCount: 7,
};

export const MultipleFieldsWithSpecifiedListOfFields = Template.bind({});
MultipleFieldsWithSpecifiedListOfFields.args = {
  valueType: VALUE_TYPES.MULTIPLE_FIELDS.name,
  name: "multipleFields",
  multipleFields: [
    {
      valueType: VALUE_TYPES.LEGEND_MIN_MAX.name,
      name: "legend-definition",
      label: "Legend",
      legendDefinition: { name: "Target Reached", id: "legend-definition-id", color: "#147e14" },
    },
    {
      valueType: VALUE_TYPES.LEGEND_DEFINITION.name,
      name: "legend-definition",
      label: "Legend",
    },
    {
      valueType: VALUE_TYPES.TEXT.name,
      name: "text",
      label: "Text Field",
    },
  ],
};

export default {
  title: "Components/Custom Inputs/RHFInput",
  component: Input,
  decorators: [
    (InputStory: any) => {
      const form = useForm();
      return (
        <FormProvider {...form}>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <div
              style={{
                width: 600,
                height: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <InputStory />
            </div>
          </div>
          <DevTool />
        </FormProvider>
      );
    },
  ],
  parameters: {
    actions: {
      handles: ["onChange"],
    },
  },
  argTypes: { onChange: { action: "onChange" } },
};
