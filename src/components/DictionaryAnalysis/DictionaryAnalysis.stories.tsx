import type { Story } from "@storybook/react";
import React from "react";
// import { DataSourceSelectorProps } from "./types";
import DataSourceSelector from "./index";
import "../../styles/styles.css";
import DataSourceProvider from "../../dataProviders/dataSourceProvider";
import DictionaryAnalysis from "./index";

const Template: Story<any> = (args) => <DictionaryAnalysis {...args} />;

export const IndicatorSelector = Template.bind({});
IndicatorSelector.args = {
  dataSources: [],
};

export default {
  title: "Components/Dictionary Analysis",
  component: DictionaryAnalysis,
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
