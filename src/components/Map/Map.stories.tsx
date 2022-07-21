import type { Story } from "@storybook/react";
import React from "react";
import { MapProps } from "./interfaces";
import Map from "./index";

const Template: Story<MapProps> = (args) => <Map {...args} />;

export const Default = Template.bind({});
Default.args = {
  orgUnitSelection: { orgUnits: [], userOrgUnit: true, userSubUnit: true, userSubX2Unit: true },
};

export default {
  title: "Components/Map",
  component: Map,
  decorators: [
    (MapStory: any) => {
      return (
        <div style={{ width: 900, height: "100%" }}>
          <MapStory />
        </div>
      );
    },
  ],
};
