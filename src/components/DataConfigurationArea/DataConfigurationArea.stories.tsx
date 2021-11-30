import { Button, IconAdd24, IconDimensionIndicator16, IconDimensionProgramIndicator16 } from "@dhis2/ui";
import { Story } from "@storybook/react";
import React from "react";
import DataConfigurationArea, { DataConfigurationAreaGroupProps, DataConfigurationAreaProps } from "./index";

const Template: Story<DataConfigurationAreaProps> = (args) => <DataConfigurationArea {...args} />;

const groups: Array<DataConfigurationAreaGroupProps> = [
  {
    id: "group-1",
    name: "Group 1",
    items: [
      {
        id: "item-1",
        name: "Item 1",
        icon: <IconDimensionIndicator16 />,
        subLabel: "Indicator",
      },
      {
        id: "item-2",
        name: "Item 2",
        icon: <IconDimensionProgramIndicator16 />,
        subLabel: "Program Indicator",
      },
    ],
  },
  {
    id: "group-2",
    name: "Group 2",
    items: [
      {
        id: "item-1",
        name: "Item 1",
        icon: <IconDimensionIndicator16 />,
        subLabel: "Indicator",
      },
      {
        id: "item-2",
        name: "Item 2",
        icon: <IconDimensionProgramIndicator16 />,
        subLabel: "Program Indicator",
      },
    ],
  },
];

export const BasicDataConfigurationArea = Template.bind({});

BasicDataConfigurationArea.args = {
  groups,
  onItemClick: (id: string) => console.log(id),
};

export const WithDeletableGroups = Template.bind({});

WithDeletableGroups.args = {
  groups,
  deletableGroups: true,
  onItemClick: (id: string) => console.log(id),
};

export const WithDeletableItems = Template.bind({});

WithDeletableItems.args = {
  groups,
  deletableGroups: true,
  deletableItems: true,
  onItemClick: (id: string) => console.log(id),
};

export const WithAllOptions = Template.bind({});

WithAllOptions.args = {
  groups,
  deletableGroups: true,
  deletableItems: true,
  editableTitle: true,
  onItemClick: (id: string) => console.log(id),
};

export const WithGroupFooter = Template.bind({});

WithGroupFooter.args = {
  groups,
  deletableGroups: true,
  deletableItems: true,
  editableTitle: true,
  onItemClick: (id: string) => console.log(id),
  groupFooter: (group) => {
    return (
      <div>
        <p>Footer for {`${group.name}`}</p>
        <Button icon={<IconAdd24 />}>Add Item</Button>
      </div>
    );
  },
};

export const DraggableItems = Template.bind({});

DraggableItems.args = {
  groups,
  deletableGroups: true,
  deletableItems: true,
  editableTitle: true,
  draggableItems: true,
  onItemClick: (id: string) => console.log(id),
};

export default {
  title: "Components/DataConfigurationArea/DataConfigurationArea",
  component: DataConfigurationArea,
  decorators: [
    (DataConfigurationAreaStory: any) => (
      <div style={{ width: "100%", height: "100%", padding: "24px" }}>
        <DataConfigurationAreaStory />
      </div>
    ),
  ],
};
