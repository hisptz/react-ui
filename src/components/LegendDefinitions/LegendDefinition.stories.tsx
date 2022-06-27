import type { Story } from "@storybook/react";
import React from "react";
import LegendDefinitionsField from "./components/LegendDefinitions";

const Template: Story<any> = (args) => <LegendDefinitionsField {...args} />;

export const LegendDefinition = Template.bind({});

LegendDefinition.args = {
  shouldVerify: false,
  label: "Legend Definitions",
  name: "legendDefinitions",
  onChange: (values: any) => {
    console.log(values);
  },
  value: [],
};

export default {
  title: "Components/Legend Definitions/Field",
  component: LegendDefinition,
};
