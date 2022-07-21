import type { Story } from "@storybook/react";
import React from "react";
import { MapProps } from "./interfaces";
import Map from "./index";

const Template: Story<MapProps> = (args) => <Map {...args} />;

export const BaseMap = Template.bind({});
BaseMap.args = {
  orgUnitSelection: { orgUnits: [], userOrgUnit: true, userSubUnit: true, userSubX2Unit: true },
};

export const BoundaryLayer = Template.bind({});
BoundaryLayer.args = {
  orgUnitSelection: { orgUnits: [], userOrgUnit: true, userSubUnit: true, userSubX2Unit: true },
  boundaryLayer: {
    enabled: true,
  },
};

export default {
  title: "Components/Map",
  component: Map,
  decorators: [
    (MapStory: any) => {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <MapStory />
        </div>
      );
    },
  ],
};
