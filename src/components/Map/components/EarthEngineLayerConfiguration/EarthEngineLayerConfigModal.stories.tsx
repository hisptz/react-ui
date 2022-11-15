import { Story } from "@storybook/react";
import { EarthEngineLayerConfigModal, EarthEngineLayerConfigModalProps, EarthEngineLayerConfiguration } from "./index";
import React from "react";

const Template: Story<EarthEngineLayerConfigModalProps> = (args) => {
  return <EarthEngineLayerConfigModal {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {
  onClose: () => {},
  onChange: console.info,
  open: true,
};

export default {
  title: "Components/Map/Earth Engine Config Modal",
  component: EarthEngineLayerConfiguration,
  decorators: [
    (MapStory: any) => {
      return (
        <div style={{ width: "50%", height: "50%" }}>
          <MapStory />
        </div>
      );
    },
  ],
};
