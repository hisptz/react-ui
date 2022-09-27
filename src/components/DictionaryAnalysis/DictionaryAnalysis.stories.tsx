import type { Story } from "@storybook/react";
import React from "react";
import DataSourceSelector from "./index";
import "../../styles/styles.css";
import DataSourceProvider from "../../dataProviders/dataSourceProvider";
import DictionaryAnalysis from "./index";
import { DataSourceSelectorProps } from "./Utils/Models";

const Template: Story<DataSourceSelectorProps> = (args) => <DictionaryAnalysis {...args} />;

export const IndicatorSelector = Template.bind({});
IndicatorSelector.args = {
  dataSources: [
    {
      id: "QQkOAJFukyY"
    },
    {
      id: "cTzH6P0K2Eq"
    },
    {
      id: "QVZjSkvUCgu"
    },
  ],
};

export default {
  title: "Components/Dictionary Analysis",
  component: DictionaryAnalysis,
  decorators: [
    (DataSourceSelectorStory: any) => (
      <div className="row w-100 center">
        <div style={{ width: 700, height:"100vh", overflow: 'auto',marginTop:"100px", }}>
          {/* <DataSourceProvider> */}
          <DataSourceSelectorStory />
          {/* </DataSourceProvider> */}
        </div>
      </div>
    ),
  ],
  argTypes: {},
};
