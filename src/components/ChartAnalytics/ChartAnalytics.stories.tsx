import { Story } from "@storybook/react";
import React from "react";
import { ChartAnalyticsProps } from "./types/props";
import ChartAnalytics from ".";

const Template: Story<ChartAnalyticsProps> = (args) => <ChartAnalytics {...args} />;

export const Default = Template.bind({});
Default.args = {
  analysisData: {
    _data: {
      headers: [
        {
          name: "dx",
          column: "Data",
          valueType: "TEXT",
          type: "java.lang.String",
          hidden: false,
          meta: true,
        },
        {
          name: "ou",
          column: "Organisation unit",
          valueType: "TEXT",
          type: "java.lang.String",
          hidden: false,
          meta: true,
        },
        {
          name: "pe",
          column: "Period",
          valueType: "TEXT",
          type: "java.lang.String",
          hidden: false,
          meta: true,
        },
        {
          name: "value",
          column: "Value",
          valueType: "NUMBER",
          type: "java.lang.Double",
          hidden: false,
          meta: false,
        },
      ],
      metaData: {
        names: {
          "202107": "July 2021",
          "202108": "August 2021",
          "202109": "September 2021",
          "2021Q2": "Apr to Jun 2021",
          ImspTQPwCqd: "Sierra Leone",
          dx: "Data",
          pe: "Period",
          ou: "Organisation unit",
          ReUHfIn0pTQ: "ANC 1-3 Dropout Rate",
        },
        dx: ["ReUHfIn0pTQ"],
        pe: ["2021Q2", "202107", "202108", "202109"],
        ou: ["ImspTQPwCqd"],
        co: [],
      },
      rows: [
        ["ReUHfIn0pTQ", "ImspTQPwCqd", "2021Q2", "39.7"],
        ["ReUHfIn0pTQ", "ImspTQPwCqd", "202107", "33.4"],
        ["ReUHfIn0pTQ", "ImspTQPwCqd", "202108", "33.2"],
        ["ReUHfIn0pTQ", "ImspTQPwCqd", "202109", "31.3"],
      ],
      height: 4,
      width: 4,
    },
  },
  chartConfiguration: {
    layout: {
      column: ["dx"],
      row: ["pe"],
      filter: ["ou"],
    },
    currentChartType: "column",
  },
};

export const LinkedChart = Template.bind({});
LinkedChart.args = {
  analysisData: {
    _data: {
      headers: [
        {
          name: "dx",
          column: "Data",
          valueType: "TEXT",
          type: "java.lang.String",
          hidden: false,
          meta: true,
        },
        {
          name: "ou",
          column: "Organisation unit",
          valueType: "TEXT",
          type: "java.lang.String",
          hidden: false,
          meta: true,
        },
        {
          name: "pe",
          column: "Period",
          valueType: "TEXT",
          type: "java.lang.String",
          hidden: false,
          meta: true,
        },
        {
          name: "value",
          column: "Value",
          valueType: "NUMBER",
          type: "java.lang.Double",
          hidden: false,
          meta: false,
        },
      ],
      metaData: {
        names: {
          "202010": "October 2020",
          "202011": "November 2020",
          "202012": "December 2020",
          "202101": "January 2021",
          "202102": "February 2021",
          "202103": "March 2021",
          "202104": "April 2021",
          "202105": "May 2021",
          "202106": "June 2021",
          "202107": "July 2021",
          "202108": "August 2021",
          "202109": "September 2021",
          ou: "Organisation unit",
          ImspTQPwCqd: "Sierra Leone",
          "2021Q1": "Jan to Mar 2021",
          dx: "Data",
          pe: "Period",
          Uvn6LCg7dVU: "ANC 1 Coverage",
          ReUHfIn0pTQ: "ANC 1-3 Dropout Rate",
        },
        dx: ["Uvn6LCg7dVU", "ReUHfIn0pTQ"],
        pe: ["2021Q1", "202010", "202011", "202012", "202101", "202102", "202103", "202104", "202105", "202106", "202107", "202108", "202109"],
        ou: ["ImspTQPwCqd"],
        co: [],
      },
      rows: [
        ["Uvn6LCg7dVU", "ImspTQPwCqd", "2021Q1", "95.5"],
        ["Uvn6LCg7dVU", "ImspTQPwCqd", "202010", "86.3"],
        ["Uvn6LCg7dVU", "ImspTQPwCqd", "202011", "97.9"],
        ["Uvn6LCg7dVU", "ImspTQPwCqd", "202012", "79.2"],
        ["Uvn6LCg7dVU", "ImspTQPwCqd", "202101", "96.6"],
        ["Uvn6LCg7dVU", "ImspTQPwCqd", "202102", "100.8"],
        ["Uvn6LCg7dVU", "ImspTQPwCqd", "202103", "89.7"],
        ["Uvn6LCg7dVU", "ImspTQPwCqd", "202104", "109.1"],
        ["Uvn6LCg7dVU", "ImspTQPwCqd", "202105", "142.2"],
        ["Uvn6LCg7dVU", "ImspTQPwCqd", "202106", "118.8"],
        ["Uvn6LCg7dVU", "ImspTQPwCqd", "202107", "109.2"],
        ["Uvn6LCg7dVU", "ImspTQPwCqd", "202108", "106.2"],
        ["Uvn6LCg7dVU", "ImspTQPwCqd", "202109", "111.7"],
        ["ReUHfIn0pTQ", "ImspTQPwCqd", "2021Q1", "36.4"],
        ["ReUHfIn0pTQ", "ImspTQPwCqd", "202010", "34.0"],
        ["ReUHfIn0pTQ", "ImspTQPwCqd", "202011", "24.5"],
        ["ReUHfIn0pTQ", "ImspTQPwCqd", "202012", "35.3"],
        ["ReUHfIn0pTQ", "ImspTQPwCqd", "202101", "40.7"],
        ["ReUHfIn0pTQ", "ImspTQPwCqd", "202102", "35.5"],
        ["ReUHfIn0pTQ", "ImspTQPwCqd", "202103", "32.7"],
        ["ReUHfIn0pTQ", "ImspTQPwCqd", "202104", "36.3"],
        ["ReUHfIn0pTQ", "ImspTQPwCqd", "202105", "46.7"],
        ["ReUHfIn0pTQ", "ImspTQPwCqd", "202106", "34.2"],
        ["ReUHfIn0pTQ", "ImspTQPwCqd", "202107", "33.4"],
        ["ReUHfIn0pTQ", "ImspTQPwCqd", "202108", "33.2"],
        ["ReUHfIn0pTQ", "ImspTQPwCqd", "202109", "31.3"],
      ],
      height: 26,
      width: 4,
    },
  },
  chartConfiguration: {
    layout: {
      column: ["dx"],
      row: ["pe"],
      filter: ["ou"],
    },
    currentChartType: "line",
  },
};

export default {
  title: "Components/Chart Analytics",
  component: ChartAnalytics,
  decorators: [
    (ChartStory: any) => {
      return (
        <div style={{ width: 900, height: "100%" }}>
          <ChartStory />
        </div>
      );
    },
  ],
};
