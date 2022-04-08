import { Story } from "@storybook/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ConfirmDialogProvider } from "../ConfirmDialog";
import RHFLegendDefinitions, { RHFLegendDefinitionFormFieldProps } from "./components/RHF";


const Template: Story<RHFLegendDefinitionFormFieldProps> = (args) => <RHFLegendDefinitions {...args} />;


export const RHFLegendDefinition = Template.bind({});

RHFLegendDefinition.args = {
  shouldVerify: false,
  label: "Legend Definitions",
  name: "legendDefinitions"
};

export const RHFLegendDefinitionWithVerification = Template.bind({});

RHFLegendDefinitionWithVerification.args = {
  shouldVerify: true,
  label: "Legend Definitions",
  name: "legendDefinitions",
  onResetLegends: () => {
    console.log("Reset legends");
  }
};


export default {
  title: "Components/Legend Definitions/RHF",
  component: RHFLegendDefinition,
  decorators: [
    (LegendDefinitionStory: any) => {
      const form = useForm();

      return (
        <ConfirmDialogProvider>
          <FormProvider {...form}>
            <LegendDefinitionStory />
          </FormProvider>
        </ConfirmDialogProvider>
      );

    }
  ]
};
