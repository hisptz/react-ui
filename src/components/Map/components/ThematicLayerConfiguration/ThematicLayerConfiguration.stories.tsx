import { Story } from "@storybook/react";
import { ThematicLayerConfiguration, ThematicLayerConfigurationProps } from "./index";
import React from "react";
import { useForm } from "react-hook-form";
import { ThematicLayerConfig } from "../MapLayer/interfaces";
import i18n from "@dhis2/d2-i18n";
import { Button } from "@dhis2/ui";

const Template: Story<ThematicLayerConfigurationProps> = (args) => {
  const form = useForm<ThematicLayerConfig>();
  return (
    <form className="column gap-16" onSubmit={form.handleSubmit(console.log)}>
      <ThematicLayerConfiguration {...args} form={form} />
      <Button type="submit">{i18n.t("Submit")}</Button>
    </form>
  );
};

export const Basic = Template.bind({});
Basic.args = {};

export default {
  title: "Components/Map/Thematic Layer Configuration",
  component: ThematicLayerConfiguration,
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
