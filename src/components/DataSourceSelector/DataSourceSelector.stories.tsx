import { Story } from "@storybook/react";
import React from "react";
import DataSourceSelector from "components/DataSourceSelector/index";
import { DataSourceSelectorProps } from "components/DataSourceSelector/types";
import "styles/styles.css";

const Template: Story<DataSourceSelectorProps> = (args) => <DataSourceSelector {...args} />;

export const IndicatorSelector = Template.bind({});
IndicatorSelector.args = {
  onSubmit: (data) => {
    console.log(data);
  },
  dataSources: [],
  maxSelections: "Infinity",
};
export const WithMaxSelection = Template.bind({});
WithMaxSelection.args = {
  onSubmit: (data) => {
    console.log(data);
  },
  maxSelections: 1,
};

export const WithAllAvailableDataSources = Template.bind({});
WithAllAvailableDataSources.args = {
  onSubmit: (data) => {
    console.log(data);
  },
  maxSelections: 1,
  dataSources: ["dataSet", "customFunction", "indicator", "programIndicator", "dataElement"],
};

export default {
  title: "Components/Data Source Selector",
  component: DataSourceSelector,
  decorators: [
    (DataSourceSelectorStory: any) => (
      <div className="row w-100 center">
        <div style={{ width: 600 }}>
          <DataSourceSelectorStory />
        </div>
      </div>
    ),
  ],
  argTypes: {
    maxSelections: {
      control: "radio",
      options: [1, "Infinity"],
    },
  },
};
