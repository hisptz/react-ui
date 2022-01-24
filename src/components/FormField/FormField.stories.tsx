import { Story } from "@storybook/react";
import React, { useState } from "react";
import FormFieldModel from "./components/Input/models/field";
import { InputProps } from "./components/Input/types";
import { VALUE_TYPES } from "./constants";
import { Input } from "./index";

const Template: Story<InputProps> = (args, context) => (
  <Input
    {...args}
    input={{
      ...args.input,
      value: context.value,
      onChange: context.onChange,
    }}
  />
);

export const NativeInputs = Template.bind({});
NativeInputs.args = {
  valueType: VALUE_TYPES.TEXT.name,
  input: {
    value: "Text field",
    onChange: console.log,
    name: "text",
    label: "Text Field",
  },
};

export const LegendDefinitionInput = Template.bind({});
LegendDefinitionInput.args = {
  valueType: VALUE_TYPES.LEGEND_DEFINITION.name,
  input: {
    value: {
      name: "Target Reached",
      color: "#147e14",
    },
    onChange: console.log,
    name: "legend-definition",
    label: "Legend",
  },
};

export const LegendMinMax = Template.bind({});
LegendMinMax.args = {
  valueType: VALUE_TYPES.LEGEND_MIN_MAX.name,
  input: {
    value: {
      id: "legend-id",
      legendDefinitionId: "legend-definition-id",
      startValue: 1,
      endValue: 100,
    },
    onChange: console.log,
    name: "legend-definition",
    label: "Legend",
  },
  legendDefinition: { name: "Target Reached", id: "legend-defn-id", color: "#147e14" },
};

export const MultipleFields = Template.bind({});
MultipleFields.args = {
  valueType: VALUE_TYPES.MULTIPLE_FIELDS.name,
  input: {
    value: [
      {
        name: "Target Reached",
        color: "#147e14",
      },
      {
        name: "Better Performance",
        color: "#eeea21",
      },
      {
        name: "Worst Performance",
        color: "#ee2139",
      },
    ],
    onChange: console.log,
    name: "multiple-fields",
    label: "Multiple Fields",
  },
  multipleField: {
    valueType: VALUE_TYPES.LEGEND_DEFINITION.name,
    input: {
      value: "",
      onChange: console.log,
      name: "legend-definition",
    },
  },
  initialFieldCount: 4,
};

export const MultipleFieldsWithSpecifiedListOfFields = Template.bind({});
MultipleFieldsWithSpecifiedListOfFields.args = {
  valueType: VALUE_TYPES.MULTIPLE_FIELDS.name,
  input: {
    value: [
      {
        id: "id",
        legendDefinitionId: "legend-definition-id",
        startValue: 1,
        endValue: 100,
      },
      {
        name: "Better Performance",
        color: "#eeea21",
      },
      "Text",
    ],
    onChange: console.log,
    name: "multiple-fields",
    label: "Multiple Fields",
  },
  multipleFields: [
    new FormFieldModel({
      valueType: VALUE_TYPES.LEGEND_MIN_MAX.name,
      name: "legend-definition",
      label: "Legend",
      legendDefinition: { name: "Target Reached", id: "legend-definition-id", color: "#147e14" },
    }),
    new FormFieldModel({
      valueType: VALUE_TYPES.LEGEND_DEFINITION.name,
      name: "legend-definition",
      label: "Legend",
    }),
    new FormFieldModel({
      valueType: VALUE_TYPES.TEXT.name,
      name: "text",
      label: "Text Field",
    }),
  ],
};

export default {
  title: "Components/Custom Inputs",
  component: Input,
  decorators: [
    (InputStory: any) => {
      const [value, setValue] = useState();
      return (
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
            <InputStory value={value} onChange={setValue} />
          </div>
        </div>
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
