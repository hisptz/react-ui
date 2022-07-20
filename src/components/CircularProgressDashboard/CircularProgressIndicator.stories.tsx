import type { Story } from "@storybook/react";
import React from "react";
import { CircularDashboardProps } from "./types/props";
import CircularProgressDashboard from ".";

const Template: Story<CircularDashboardProps> = (args) => <CircularProgressDashboard {...args} />;

export const Default = Template.bind({});
Default.args = {
  numerator: 7,
  denominator: 10,
  size: 500,
};

export const WithStrokeStyling = Template.bind({});
WithStrokeStyling.args = {
  numerator: 7,
  denominator: 10,
  size: 500,
  strokeStyle: {
    width: "10%",
    color: "red",
  },
};

export const WithTextStyling = Template.bind({});
WithTextStyling.args = {
  numerator: 7,
  denominator: 10,
  size: 500,
  textStyle: {
    color: "red",
    fontWeight: "bold",
    fontSize: "20vh",
  },
};

export default {
  title: "Components/Circular Progress Indicator",
  component: CircularProgressDashboard,
};
