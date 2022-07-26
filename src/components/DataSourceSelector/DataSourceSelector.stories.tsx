import type { Story } from "@storybook/react";
import React from "react";
import { DataSourceSelectorProps } from "./types";
import DataSourceSelector from "./index";
import "../../styles/styles.css";
import DataSourceProvider from "../../dataProviders/dataSourceProvider";

const Template: Story<DataSourceSelectorProps> = (args) => <DataSourceSelector {...args} />;

export const IndicatorSelector = Template.bind({});
IndicatorSelector.args = {
  onSelect: (data) => {
    console.log(data);
  },
  dataSources: [],
  maxSelections: "Infinity",
};
export const WithMaxSelection = Template.bind({});
WithMaxSelection.args = {
  onSelect: (data) => {
    console.log(data);
  },
  maxSelections: 1,
};

export const WithAllAvailableDataSources = Template.bind({});
WithAllAvailableDataSources.args = {
  onSelect: (data) => {
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
          <DataSourceProvider>
            <DataSourceSelectorStory />
          </DataSourceProvider>
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
