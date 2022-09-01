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
  dataSources: [
    {
        "id": "UT1DJmtzyox",
        "name": "RMNCH ANC 1st visit coverage (%)",
        "type": "indicator",
        "label": "RMNCH ANC 1st visit coverage (%)",
        "weight": 100,
        "legends": [
            {
                "id": "LS8UhHFbikY",
                "endValue": 100,
                "startValue": "90",
                "legendDefinitionId": "#008000"
            },
            {
                "id": "cE4yOxFXwat",
                "endValue": "89",
                "startValue": "60",
                "legendDefinitionId": "#FFFF00"
            },
            {
                "id": "whkLs1HWa2T",
                "endValue": "59",
                "startValue": 1,
                "legendDefinitionId": "#FF0000"
            }
        ],
        "highIsGood": true,
        "showColors": false,
        "effectiveGap": 5,
        "displayArrows": true
    }
],
};

export default {
  title: "Components/Dictionary Analysis",
  component: DictionaryAnalysis,
  decorators: [
    (DataSourceSelectorStory: any) => (
      <div className="row w-100 center">
        <div style={{ width: 600 }}>
          {/* <DataSourceProvider> */}
            <DataSourceSelectorStory />
          {/* </DataSourceProvider> */}
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
