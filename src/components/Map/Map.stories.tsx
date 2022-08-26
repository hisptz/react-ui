import { Period } from "@iapps/period-utilities";
import type { Story } from "@storybook/react";
import React from "react";
import MapDataProvider from "../../dataProviders/map";
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

export const BoundaryLayerWithLevels = Template.bind({});
BoundaryLayerWithLevels.args = {
  orgUnitSelection: {
    orgUnits: [
      {
        id: "ImspTQPwCqd",
        displayName: "Sierra Leone",
        name: "Sierra Leone",
        path: "/ImspTQPwCqd",
        children: [],
      },
    ],
    levels: ["2"],
  },
  boundaryLayer: {
    enabled: true,
  },
};

export const ChoroplethThematicLayer = Template.bind({});
ChoroplethThematicLayer.args = {
  orgUnitSelection: { orgUnits: [], userOrgUnit: true, userSubUnit: true, userSubX2Unit: true },
  boundaryLayer: {
    enabled: true,
  },
  thematicLayers: [
    {
      type: "choropleth",
      id: "choropleth",
      enabled: true,
      dataItem: {
        id: "Uvn6LCg7dVU",
        displayName: "ANC 1 Coverage",
        type: "indicator",
      },
      control: {
        enabled: true,
        position: "topright",
      },
    },
  ],
  periodSelection: {
    periods: [
      {
        ...new Period().setPreferences({ allowFuturePeriods: true }).getById("2022"),
      },
    ],
  },
};

export const ChoroplethThematicLayerWithLevels = Template.bind({});
ChoroplethThematicLayerWithLevels.args = {
  orgUnitSelection: {
    orgUnits: [
      {
        id: "ImspTQPwCqd",
        displayName: "Sierra Leone",
        name: "Sierra Leone",
        path: "/ImspTQPwCqd",
        children: [],
      },
    ],
    levels: ["3"],
  },
  boundaryLayer: {
    enabled: true,
  },
  thematicLayers: [
    {
      type: "choropleth",
      id: "choropleth",
      enabled: true,
      dataItem: {
        id: "Uvn6LCg7dVU",
        displayName: "ANC 1 Coverage",
        type: "indicator",
      },
      control: {
        enabled: true,
        position: "topright",
      },
    },
  ],
  periodSelection: {
    periods: [
      {
        ...new Period().setPreferences({ allowFuturePeriods: true }).getById("2022"),
      },
    ],
  },
};

export default {
  title: "Components/Map",
  component: Map,
  decorators: [
    (MapStory: any) => {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <MapDataProvider>
            <MapStory />
          </MapDataProvider>
        </div>
      );
    },
  ],
};