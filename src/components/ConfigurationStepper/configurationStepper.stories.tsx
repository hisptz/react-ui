import { Story } from "@storybook/react";
import React from "react";
import { ConfigurationStepperProps } from "./types/props";
import ConfigurationStepper from ".";

const Template: Story<ConfigurationStepperProps> = (args) => <ConfigurationStepper {...args} />;

export const MultiStepper = Template.bind({});
MultiStepper.args = {
  stepsManagement: [
    {
      label: "General",
      component: () => (
        <div className="container">
          <div className="column text-center">
            <h1>1</h1>
          </div>
        </div>
      ),
      helpSteps: [],
    },
    {
      label: "Data Configuration",
      component: () => (
        <div className="container">
          <div className="column text-center">
            <h1>2</h1>
          </div>
        </div>
      ),
      helpSteps: [],
    },
    {
      label: "Highlighted Indicators",
      component: () => (
        <div className="container">
          <div className="column text-center">
            <h1>3</h1>
          </div>
        </div>
      ),
      helpSteps: [],
    },
    {
      label: "Access",
      component: () => (
        <div className="container">
          <div className="column text-center">
            <h1>4</h1>
          </div>
        </div>
      ),
      helpSteps: [],
    },
    {
      label: "Options",
      component: () => (
        <div className="container">
          <div className="column">
            <h1>5</h1>
          </div>
        </div>
      ),
      helpSteps: [],
    },
  ],
  onLastAction: () => {},
  onLastActionButtonName: "Save",
  activeStepperBackGroundColor: "#00695c",
};

export const SimpleStepper = Template.bind({});

SimpleStepper.args = {
  stepsManagement: [
    {
      label: "Determinant",
      component: () => (
        <div className="container">
          <div className="column text-center">
            <h3>Determinant </h3>
          </div>
        </div>
      ),
      helpSteps: [],
    },

    {
      label: "Access",
      component: () => (
        <div className="container">
          <div className="column text-center">
            <h3>Access </h3>
          </div>
        </div>
      ),
      helpSteps: [],
    },
  ],
  onLastAction: () => {},
  onLastActionButtonName: "Save",
  activeStepperBackGroundColor: "#00695c",
};

export default {
  title: "Components/Stepper Configuration",
  component: ConfigurationStepper,
};
