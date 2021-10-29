import { Story } from "@storybook/react";
import React from "react";
import { OrgUnitSelectorProps } from "./types";
import OrgUnitSelector from "./index";

const Template: Story<OrgUnitSelectorProps> = (args) => <OrgUnitSelector {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: { orgUnits: [] },
  onUpdate: (value) => {
    console.log(value);
  },
};
export const SingleSelection = Template.bind({});
SingleSelection.args = {
  value: { orgUnits: [] },
  onUpdate: (value) => {
    console.log(value);
  },
  singleSelection: true,
};

export const WithUserOptions = Template.bind({});
WithUserOptions.args = {
  value: { orgUnits: [] },
  onUpdate: (value) => {
    console.log(value);
  },
  showUserOptions: true,
};

export const WithLevels = Template.bind({});
WithLevels.args = {
  value: { orgUnits: [] },
  onUpdate: (value) => {
    console.log(value);
  },
  showLevels: true,
};

export const WithGroups = Template.bind({});
WithGroups.args = {
  value: { orgUnits: [] },
  onUpdate: (value) => {
    console.log(value);
  },
  showGroups: true,
};

export const WithLevelsAndGroups = Template.bind({});
WithLevelsAndGroups.args = {
  value: { orgUnits: [] },
  onUpdate: (value) => {
    console.log(value);
  },
  showLevels: true,
  showGroups: true,
};

export const WithAllOptions = Template.bind({});
WithAllOptions.args = {
  value: { orgUnits: [] },
  onUpdate: (value) => {
    console.log(value);
  },
  showUserOptions: true,
  showLevels: true,
  showGroups: true,
};

export default {
  title: "Components/Organisation Unit Selector",
  component: OrgUnitSelector,
};
