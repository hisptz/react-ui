import type { Story } from "@storybook/react";
import React from "react";
import { SingleValueContainerProps } from "./types/props";
import SingleValueContainer from ".";

const Template: Story<SingleValueContainerProps> = (args) => <SingleValueContainer />;

export const Default = Template.bind({});

export default {
  title: "Components/Single Value Container",
  component: SingleValueContainer,
  decorators: [
    (SingleValueStory: any) => {
      return (
        <div style={{ width: 900, height: "100%" }}>
          <SingleValueStory />
        </div>
      );
    },
  ],
};
