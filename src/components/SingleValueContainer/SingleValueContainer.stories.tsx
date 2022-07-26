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

export default {
  title: "Components/Single Value Container",
  component: SingleValueContainer,
  decorators: [
    (SingleValueStory: any) => {
      return <SingleValueStory />;
    },
  ],
};
