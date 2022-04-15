import { DevTool } from "@hookform/devtools";
import { Story } from "@storybook/react";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { CustomInput } from "../../index";
import Input from "./components/Input";
import { VALUE_TYPES } from "./constants";
import { InputProps } from "./types";

const Template: Story<InputProps> = (args) => <CustomInput {...args} />;

export const NativeInputs = Template.bind({});
NativeInputs.args = {
  valueType: VALUE_TYPES.TEXT.name,
  label: "Text",
  name: "text",
  mandatory: true,
  input: {
    name: "",
    onChange: () => {},
  },
};

export default {
  title: "Components/Custom Inputs/CustomInput",
  component: Input,
  decorators: [
    (InputStory: any, { args }: any) => {
      console.log(args);
      const form = useForm();
      return (
        <FormProvider {...form}>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Controller
                name="text"
                render={({ field, fieldState }) => {
                  return <InputStory {...args} input={field} {...field} {...fieldState} />;
                }}
              />
            </div>
          </div>
          <DevTool />
        </FormProvider>
      );
    },
  ],
  parameters: {
    actions: {
      handles: ["onChange"],
    },
  },
  argTypes: {
    valueType: { control: { type: "select", options: Object.keys(VALUE_TYPES) } },
  },
};
