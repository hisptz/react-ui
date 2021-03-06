export type StepsList = {
  label: string;
  component: (props?: any) => any;
  helpSteps?: Array<any>;
};

export type ConfigurationStepperProps = {
  activeStep: StepsList;
  setActiveStep: (step: StepsList) => void;
  steps: StepsList[];
  onLastAction: (value?: any) => void;
  activeStepperBackGroundColor: string;
  onCancelLastAction: (value?: any) => void;
  onLastActionButtonName: string;
  onStepChange?: (fromIndex: number, toIndex: number) => boolean | Promise<boolean>;
};
