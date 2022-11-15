import { Story } from "@storybook/react";
import { ThematicLayerConfigModal, ThematicLayerConfigModalProps } from "./index";
import React from "react";

const Template: Story<ThematicLayerConfigModalProps> = (args) => {
  return <ThematicLayerConfigModal {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {
  onChange: console.info,
  onClose: () => {},
  open: true,
};

export default {
  title: "Components/Map/Thematic Layer Config Modal",
  component: ThematicLayerConfigModal,
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
