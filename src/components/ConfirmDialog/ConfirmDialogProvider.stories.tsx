import { Button } from "@dhis2/ui";
import { Story } from "@storybook/react";
import React, { ReactNode } from "react";
import { ConfirmDialogConfig, ConfirmDialogProvider, useConfirmDialog } from "./index";

const ExampleChild = ({ config }: { config?: ConfirmDialogConfig }) => {
  const { confirm } = useConfirmDialog();

  return (
    <Button
      onClick={() => {
        confirm(
          config ?? {
            title: "Are you sure?",
            message: "Your confirm message will appear here",
            onConfirm: () => {
              alert("Confirmed 🤗");
            },
            onCancel: () => {
              alert("Cancelled 😔");
            },
          }
        );
      }}>
      Click me!
    </Button>
  );
};

const Template: Story<{ children: ReactNode }> = (args) => <ConfirmDialogProvider>{args.children}</ConfirmDialogProvider>;

export const ConfirmDialogInProvider = Template.bind({});
ConfirmDialogInProvider.args = {
  children: (
    <div>
      <ExampleChild />
    </div>
  ),
};

export const ConfirmDialogInProviderWithOptions = Template.bind({});
ConfirmDialogInProviderWithOptions.args = {
  children: (
    <div>
      <ExampleChild
        config={{
          title: "Are you sure?",
          message: "Your confirm message will appear here",
          onConfirm: () => {
            alert("Confirmed 🤗");
          },
          onCancel: () => {
            alert("Cancelled 😔");
          },
          cancelButtonText: "Custom cancel",
          confirmButtonText: "Custom confirm",
          confirmButtonColor: "primary",
        }}
      />
    </div>
  ),
};

export default {
  title: "Components/Confirm Dialog/Confirm Dialog Provider",
  component: ConfirmDialogInProvider,
};
