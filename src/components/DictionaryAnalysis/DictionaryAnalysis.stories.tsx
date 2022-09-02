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
      id: "BvG8P80QxqZ",
      name: "Access to ANC Services",
      type: "indicator",
      label: "Access to ANC Services",
      weight: 100,
      legends: [
        {
          id: "VNRS77WEraG",
          endValue: 100,
          startValue: 67,
          legendDefinitionId: "#008000",
        },
        {
          id: "xeyNrAejMTX",
          endValue: 67,
          startValue: 34,
          legendDefinitionId: "#FFFF00",
        },
        {
          id: "FUQZwnesklK",
          endValue: 34,
          startValue: 1,
          legendDefinitionId: "#FF0000",
        },
      ],
      highIsGood: true,
      showColors: true,
      effectiveGap: 5,
      displayArrows: true,
    },
  ],
};

export default {
  title: "Components/Dictionary Analysis",
  component: DictionaryAnalysis,
  decorators: [
    (DataSourceSelectorStory: any) => (
      <div className="row w-100 center">
        <div style={{ width: 700, height:"100vh", overflow: 'auto', }}>
          {/* <DataSourceProvider> */}
          <DataSourceSelectorStory />
          {/* </DataSourceProvider> */}
        </div>
      </div>
    ),
  ],
  argTypes: {},
};
