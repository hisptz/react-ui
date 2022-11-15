import { Story } from "@storybook/react";
import { EarthEngineLayerConfiguration, EarthEngineLayerConfigurationProps } from "./index";
import React from "react";
import { useForm } from "react-hook-form";
import { CustomGoogleEngineLayer } from "../MapLayer/interfaces";
import i18n from "@dhis2/d2-i18n";
import { Button } from "@dhis2/ui";

const Template: Story<EarthEngineLayerConfigurationProps> = (args) => {
  const form = useForm<CustomGoogleEngineLayer>();
  return (
    <form className="column gap-16" onSubmit={form.handleSubmit(console.log)}>
      <EarthEngineLayerConfiguration {...args} form={form} />
      <Button type="submit">{i18n.t("Submit")}</Button>
    </form>
  );
};

export const Basic = Template.bind({});
Basic.args = {};

export default {
  title: "Components/Map/Earth Engine Configuration",
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
