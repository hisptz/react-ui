import { IconDimensionIndicator16, IconDimensionOrgUnit16 } from "@dhis2/ui";
import type { Story } from "@storybook/react";
import React from "react";
import DataSource, { DataSourceProps } from "./index";

const Template: Story<DataSourceProps> = (args) => <DataSource {...args} />;

export const BasicDataSource = Template.bind({});

BasicDataSource.args = {
  id: "1",
  label: "Data Source 1",
};

export const WithSubLabel = Template.bind({});

WithSubLabel.args = {
  id: "1",
  label: "Data Source 1",
  subLabel: "This is a data source",
  onDelete: (id) => {
    console.log(id);
  },
};

export const WithIcon = Template.bind({});

WithIcon.args = {
  id: "1",
  label: "Data Source 1",
  subLabel: "This is a data source",
  icon: <IconDimensionOrgUnit16 />,
  onDelete: (id) => {
    console.log(id);
  },
};

export const Selected = Template.bind({});

Selected.args = {
  id: "1",
  label: "Data Source 1",
  subLabel: "This is a data source",
  selected: true,
  onDelete: (id) => {
    console.log(id);
  },
};

export const Draggable = Template.bind({});

Draggable.args = {
  id: "1",
  label: "Data Source 1",
  subLabel: "This is a data source",
  draggable: true,
  icon: <IconDimensionIndicator16 />,
  onDelete: (id) => {
    console.log(id);
  },
};

export default {
  title: "Components/DataConfigurationArea/DataConfigurationAreaItem",
  component: DataSource,
};
