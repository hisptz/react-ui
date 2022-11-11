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
  orgUnitSelection: { orgUnits: [], userOrgUnit: true, userSubUnit: true, userSubX2Unit: false },
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
    periods: ["2022"],
  },
  legends: {
    enabled: true,
    position: "topright",
    collapsible: true,
  },
};

export const BubbleThematicLayer = Template.bind({});
BubbleThematicLayer.args = {
  orgUnitSelection: { orgUnits: [], userOrgUnit: true, userSubUnit: true, userSubX2Unit: true },
  boundaryLayer: {
    enabled: true,
  },
  thematicLayers: [
    {
      type: "bubble",
      id: "bubble",
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
      radius: {
        min: 0,
        max: 40,
      },
    },
  ],
  legends: {
    enabled: true,
    position: "topright",
    collapsible: true,
  },
  periodSelection: {
    periods: ["2022"],
  },
  controls: [
    {
      type: "fullscreen",
      position: "topleft",
    },
  ],
};

export const AllThematicLayers = Template.bind({});
AllThematicLayers.args = {
  orgUnitSelection: { orgUnits: [], userOrgUnit: true, userSubUnit: true, userSubX2Unit: true },
  boundaryLayer: {
    enabled: true,
  },
  thematicLayers: [
    {
      type: "choropleth",
      id: "ReUHfIn0pTQ",
      enabled: true,
      dataItem: {
        id: "ReUHfIn0pTQ",
        displayName: "ANC 1-3 Dropout Rate",
        type: "indicator",
        legendSet: "fqs276KXCXi",
      },
      control: {
        enabled: true,
        position: "topright",
      },
    },
    {
      type: "choropleth",
      id: "Uvn6LCg7dVU",
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
  legends: {
    enabled: true,
    position: "topright",
    collapsible: true,
  },
  periodSelection: {
    periods: ["2022"],
  },
  controls: [
    {
      type: "scale",
      position: "bottomleft",
      options: {
        imperial: false,
        metric: true,
      },
    },
    {
      type: "fullscreen",
      position: "bottomleft",
    },
  ],
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
  legends: {
    enabled: true,
    position: "topright",
    collapsible: true,
  },
  periodSelection: {
    periods: ["2022"],
  },
};

export const PointLayer = Template.bind({});
PointLayer.args = {
  orgUnitSelection: { orgUnits: [], userOrgUnit: true, userSubUnit: true, userSubX2Unit: false },
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
    periods: ["2022"],
  },
  pointLayer: {
    enabled: true,
    label: "Facilities",
    level: "m9lBJogzE95",
    style: {
      groupSet: "J5jldMd8OHv",
    },
  },
};

export const GoogleEarthEngineLayers = Template.bind({});
GoogleEarthEngineLayers.args = {
  orgUnitSelection: { orgUnits: [], userOrgUnit: true, userSubUnit: true, userSubX2Unit: false },
  thematicLayers: [],
  periodSelection: {
    periods: ["2022"],
  },
  earthEngineLayers: [
    {
      name: "Population",
      type: "population",
      id: "population",
      enabled: true,
      aggregations: ["sum"],
      filters: {
        period: "2020",
      },
    },
    {
      name: "Footprints",
      type: "footprints",
      id: "footprints",
      enabled: true,
      aggregations: ["sum"],
    },
    {
      name: "Land Cover",
      type: "landCover",
      id: "landCover",
      enabled: true,
      aggregations: ["sum"],
    },
  ],
  pointLayer: {
    enabled: false,
    label: "Facilities",
    level: "m9lBJogzE95",
    style: {
      groupSet: "J5jldMd8OHv",
    },
  },
};

export default {
  title: "Components/Map",
  component: Map,
  decorators: [
    (MapStory: any) => {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          {/*<MapDataProvider>*/}
          <MapStory />
          {/*</MapDataProvider>*/}
        </div>
      );
    },
  ],
};
