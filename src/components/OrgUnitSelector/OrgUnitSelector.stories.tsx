import type { Story } from "@storybook/react";
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

export const SelectedOrgUnit = Template.bind({});
SelectedOrgUnit.args = {
  value: {
    orgUnits: [
      {
        path: "/ImspTQPwCqd/Vth0fbpFcsO/LhaAPLxdSFH/AvGz949akv4",
        children: [],
        id: "AvGz949akv4",
      },
    ],
  },
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

export const WithSearch = Template.bind({});
WithSearch.args = {
  value: { orgUnits: [] },
  onUpdate: (value) => {
    console.log(value);
  },
  searchable: true,
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
  searchable: true,
};

export const SelectionDisabledLevels = Template.bind({});
SelectionDisabledLevels.args = {
  value: { orgUnits: [] },
  onUpdate: (value) => {
    console.log(value);
  },
  limitSelectionToLevels: [3, 2],
};

export const FilterByGroups = Template.bind({});
FilterByGroups.args = {
  value: { orgUnits: [] },
  onUpdate: (value) => {
    console.log(value);
  },
  filterByGroups: ["RXL3lPSK8oG"],
};

export const SpecifyingRoots = Template.bind({});
SpecifyingRoots.args = {
  value: { orgUnits: [] },
  onUpdate: (value) => {
    console.log(value);
  },
  roots: [
    {
      id: "OjXNuYyLaCJ",
      children: [],
    },
  ],
};

export default {
  title: "Components/Organisation Unit Selector",
  component: OrgUnitSelector,
  decorators: [
    (Story: any) => (
      // <OrgUnitDataProvider>
      <Story />
      // </OrgUnitDataProvider>
    ),
  ],
};
