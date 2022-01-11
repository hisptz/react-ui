export type StepsList = {
  label: string;
  component: (props?: any) => any;
  helpSteps?: Array<any>;
};

export type ConfigurationStepperProps = {
  stepsManagement: StepsList[];
  onLastAction: (value?: any) => void;
  activeStepperBackGroundColor: string;
  onCancelLastAction: (value?: any) => void;
  onLastActionButtonName: string;
  onNextStep?: (fromIndex: number, toIndex: number) => boolean;
  onPreviousStep?: (fromIndex: number, toIndex: number) => boolean;
  onStepChange?: (fromIndex: number, toIndex: number) => boolean;
};
