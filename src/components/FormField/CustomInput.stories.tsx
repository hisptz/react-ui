import { DevTool } from "@hookform/devtools";
import { Story } from "@storybook/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
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
    name: "text",
    onChange: (e) => console.log(e.value),
  },
};

export default {
  title: "Components/Custom Inputs/CustomInput",
  component: Input,
  decorators: [
    (InputStory: any) => {
      const form = useForm();
      return (
        <FormProvider {...form}>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <div
              style={{
                width: 600,
                height: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <InputStory />
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
  argTypes: { onChange: { action: "onChange" } },
};
