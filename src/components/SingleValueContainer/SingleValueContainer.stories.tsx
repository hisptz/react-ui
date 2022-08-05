import type { Story } from "@storybook/react";
import React from "react";
import { SingleValueContainerProps } from "./types/props";
import SingleValueContainer from ".";

const Template: Story<SingleValueContainerProps> = (args) => <SingleValueContainer {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "PRIORITY INDICATORS",
  singleValueItems: [
    {
      label: "Total Bookings",
      value: 136,
    },
    {
      label: "At least one dose",
      value: 45,
      percentage: 23,
      color: "#0D47A1",
    },
    {
      label: "Partially vaccinated",
      value: 13,
      percentage: 17,
      color: "#0D47A1",
    },
    {
      label: "Fully vaccinated",
      value: 126,
      percentage: 83,
      color: "#0D47A1",
    },
    {
      label: "Number of AEFI",
      value: 26,
    },
  ],
};

export const AnimatedAllValues = Template.bind({});
AnimatedAllValues.args = {
  title: "PRIORITY INDICATORS",
  animationDuration: 1500,
  animationDelay: 500,
  singleValueItems: [
    {
      label: "Total Bookings",
      value: 136344,
    },
    {
      label: "At least one dose",
      value: 4423,
      percentage: 23,
      color: "#0D47A1",
    },
    {
      label: "Partially vaccinated",
      value: 1394,
      percentage: 17,
      color: "#0D47A1",
    },
    {
      label: "Fully vaccinated",
      value: 12432,
      percentage: 83,
      color: "#0D47A1",
    },
    {
      label: "Number of AEFI",
      value: 26423,
    },
  ],
};

export const AnimatedSingleValue = Template.bind({});
AnimatedSingleValue.args = {
  title: "PRIORITY INDICATORS",
  singleValueItems: [
    {
      label: "Total Bookings",
      value: 13634244,
      animationDuration: 1000,
      animationDelay: 100,
    },
    {
      label: "At least one dose",
      value: 45423,
      percentage: 23,
      color: "#0D47A1",
      animationDuration: 1000,
      animationDelay: 600,
    },
    {
      label: "Partially vaccinated",
      value: 13434,
      percentage: 17,
      color: "#0D47A1",
      animationDuration: 1000,
      animationDelay: 1100,
    },
    {
      label: "Fully vaccinated",
      value: 126432,
      percentage: 83,
      color: "#0D47A1",
      animationDuration: 1000,
      animationDelay: 1600,
    },
    {
      label: "Number of AEFI",
      value: 268423,
      animationDuration: 1000,
      animationDelay: 2000,
    },
  ],
};

export const SingleValuesWithDecimalPlaces = Template.bind({});
SingleValuesWithDecimalPlaces.args = {
  title: "ENROLLMENTS",
  animationDuration: 1500,
  animationDelay: 500,
  singleValueItems: [
    {
      label: "Number of Enrolled Clients",
      value: 268423,
      decimalPlaces: 3,
    },
    {
      label: "Number of Served Clients",
      value: 268423,
      decimalPlaces: 1,
    },
  ],
};

export default {
  title: "Components/Single Value Container",
  component: SingleValueContainer,
  decorators: [
    (SingleValueStory: any) => {
      return <SingleValueStory />;
    },
  ],
};
