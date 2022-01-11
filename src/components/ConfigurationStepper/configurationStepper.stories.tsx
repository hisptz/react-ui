import { Story } from "@storybook/react";
import React from "react";
import { ConfigurationStepperProps } from "./types/props";
import ConfigurationStepper from ".";

const Template: Story<ConfigurationStepperProps> = (args) => <ConfigurationStepper {...args} />;

export const MultiStepper = Template.bind({});

const steps = [
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
];

MultiStepper.args = {
  steps,
  onLastAction: () => {},
  onLastActionButtonName: "Save",
  activeStepperBackGroundColor: "#00695c",
  onStepChange: () => true,
  activeStep: steps[0],
  setActiveStep: (step) => step,
};

export const SimpleStepper = Template.bind({});

const simpleSteps = [
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
];

SimpleStepper.args = {
  steps: simpleSteps,
  onLastAction: () => {},
  onLastActionButtonName: "Save",
  activeStepperBackGroundColor: "#00695c",
  onStepChange: undefined,
  activeStep: simpleSteps[0],
};

export default {
  title: "Components/Stepper Configuration",
  component: ConfigurationStepper,
};
