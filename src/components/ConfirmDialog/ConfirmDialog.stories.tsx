import { Story } from "@storybook/react";
import React from "react";
import { ConfirmDialogProps } from "./components/ConfirmDialog";
import { ConfirmDialog } from "./index";

const Template: Story<ConfirmDialogProps> = (args) => <ConfirmDialog {...args} />;

export const ConfirmDialogExample = Template.bind({});
ConfirmDialogExample.args = {
  title: "Confirm Title",
  message: "Confirm Content",
  onConfirm: () => {
    alert("Confirm 🤗");
  },
  onCancel: () => {
    alert("Cancel 😔");
  },
};

export const ConfirmDialogExampleWithAllOptions = Template.bind({});
ConfirmDialogExampleWithAllOptions.args = {
  title: "Confirm Title",
  message: "Confirm Content",
  position: "middle",
  size: "small",
  hide: false,
  cancelButtonText: "Cancel",
  confirmButtonText: "Confirm",
  confirmButtonColor: "primary",
  onConfirm: () => {
    alert("Confirm 🤗");
  },
  onCancel: () => {
    alert("Cancel 😔");
  },
  customActions: [
    {
      label: "Custom Action",
      color: "secondary",
      onClick: () => {
        alert("Custom Action 🙃");
      },
    },
  ],
};

export default {
  title: "Components/Confirm Dialog/Confirm Dialog",
  component: ConfirmDialogExample,
  argTypes: {
    title: {
      control: {
        type: "text",
      },
    },
    message: {
      control: {
        type: "text",
      },
    },
    position: {
      control: {
        type: "select",
        options: ["top", "middle", "bottom"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["small", "large"],
      },
    },
    hide: {
      control: {
        type: "boolean",
      },
    },
    cancelButtonText: {
      control: {
        type: "text",
      },
    },
    confirmButtonText: {
      control: {
        type: "text",
      },
    },
    confirmButtonColor: {
      control: {
        type: "select",
        options: ["primary", "secondary", "destructive"],
      },
    },
  },
};
