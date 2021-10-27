import { Story } from "@storybook/react";
import React from 'react';
import ChartAnalytics from "./components";
import { ChartAnalyticsProps } from "./interfaces/props";


const Template :Story<ChartAnalyticsProps> =(args) => <ChartAnalytics {...args} />

export const Dat = Template.bind({});
Dat.args = {
    analysisData: {
        "_data": {
          "headers": [
            {
              "name": "dx",
              "column": "Data",
              "valueType": "TEXT",
              "type": "java.lang.String",
              "hidden": false,
              "meta": true
            },
            {
              "name": "ou",
              "column": "Organisation unit",
              "valueType": "TEXT",
              "type": "java.lang.String",
              "hidden": false,
              "meta": true
            },
            {
              "name": "pe",
              "column": "Period",
              "valueType": "TEXT",
              "type": "java.lang.String",
              "hidden": false,
              "meta": true
            },
            {
              "name": "value",
              "column": "Value",
              "valueType": "NUMBER",
              "type": "java.lang.Double",
              "hidden": false,
              "meta": false
            }
          ],
          "metaData": {
            "names": {
              "202107": "July 2021",
              "202108": "August 2021",
              "202109": "September 2021",
              "2021Q2": "Apr to Jun 2021",
              "ImspTQPwCqd": "Sierra Leone",
              "dx": "Data",
              "pe": "Period",
              "ou": "Organisation unit",
              "ReUHfIn0pTQ": "ANC 1-3 Dropout Rate"
            },
            "dx": [
              "ReUHfIn0pTQ"
            ],
            "pe": [
              "2021Q2",
              "202107",
              "202108",
              "202109"
            ],
            "ou": [
              "ImspTQPwCqd"
            ],
            "co": []
          },
          "rows": [
            [
              "ReUHfIn0pTQ",
              "ImspTQPwCqd",
              "2021Q2",
              "39.7"
            ],
            [
              "ReUHfIn0pTQ",
              "ImspTQPwCqd",
              "202107",
              "33.4"
            ],
            [
              "ReUHfIn0pTQ",
              "ImspTQPwCqd",
              "202108",
              "33.2"
            ],
            [
              "ReUHfIn0pTQ",
              "ImspTQPwCqd",
              "202109",
              "31.3"
            ]
          ],
          "height": 4,
          "width": 4
        }
      },
    chartConfiguration:{
        layout:{
            "column": [
              "dx"
            ],
            "row": [
              "pe"
            ],
            "filter": [
              "ou"
            ]
          },
        currentChartType:'column'
    }

}
/**
 * layout: 
 * 

currentChartType:'Column'



analysisData:










 * 
 */
export default {
    title: 'Components/Chart Analytics',
    components:ChartAnalytics,
    argTypes:{
        analysisData:{
            control:'any'
        },
        chartConfiguration:{
            control:'radio'
        }

    }
    
}

/**
 * dataChartConfiguration:
 * 
 * {
  "renderId": "render-id-unique",
  "type": "column",
  "title": "undefined",
  "subtitle": "",
  "hideTitle": true,
  "hideSubtitle": false,
  "showData": true,
  "hideEmptyRows": true,
  "hideLegend": true,
  "cumulativeValues": false,
  "targetLineLabel": "",
  "baseLineLabel": "",
  "legendAlign": "bottom",
  "categoryRotation": 0,
  "reverseLegend": false,
  "showLabels": true,
  "axes": [],
  "rangeAxisMaxValue": 90,
  "sortOrder": 0,
  "percentStackedValues": true,
  "multiAxisTypes": [],
  "xAxisType": [
    "pe"
  ],
  "yAxisType": [
    "dx"
  ],
  "zAxisType": [
    "ou"
  ],
  "dataSelections": []
}
 * 
 */