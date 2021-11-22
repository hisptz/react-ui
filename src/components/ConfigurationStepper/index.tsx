import { Button, ButtonStrip } from "@dhis2/ui";
import { makeStyles, Step, StepLabel, Stepper } from "@material-ui/core";
import { findIndex } from "lodash";
import React, { Suspense, useMemo, useState } from "react";
import FullPageLoader from "../shared/components/FullPageLoader";
import { ConfigurationStepperProps } from "./types/props";
import "./styles/index.css";

export default function ConfigurationStepper({
  stepsManagement,
  onLastAction,
  activeStepperBackGroundColor,
  onLastActionButtonName,
}: ConfigurationStepperProps) {
  const [activeStep, setActiveStep] = useState(stepsManagement[0]);
  const Component = activeStep.component;

  const onNextStep = () => {
    if (!hasNextStep) {
      onLastAction();
      return;
    }
    const index = findIndex(stepsManagement, ["label", activeStep.label]);
    if (index !== stepsManagement.length - 1) {
      setActiveStep(stepsManagement[index + 1]);
    }
  };

  const onPreviousStep = () => {
    const index = findIndex(stepsManagement, ["label", activeStep.label]);
    if (index !== 0) {
      setActiveStep(stepsManagement[index - 1]);
    }
  };

  const hasNextStep = useMemo(() => findIndex(stepsManagement, ["label", activeStep.label]) !== stepsManagement.length - 1, [activeStep]);
  const hasPreviousStep = useMemo(() => findIndex(stepsManagement, ["label", activeStep.label]) > 0, [activeStep]);

  const currentIndex = useMemo(() => findIndex(stepsManagement, ["label", activeStep.label]), [activeStep]);

  const useStyles = makeStyles({
    root: {
      margin: "0 8px",
      padding: "8px",
      fontweight: "bold",
      height: "32px",
      color: "#FFFFFF",
      borderRadius: 3,
      borderwidth: "2px",
      boxShadow: "0 3px 5px 2px transparent",
    },
  });

  const classes = useStyles();
  return (
    <Suspense fallback={<FullPageLoader />}>
      <div className="column">
        <Stepper>
          {stepsManagement?.map((step) => (
            <Step
              id="stepper"
              className={classes.root}
              style={step.label === activeStep.label ? { background: activeStepperBackGroundColor } : undefined}
              active={step.label === activeStep.label}
              onClick={() => setActiveStep(step)}
              key={`${step.label}-step`}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className="row">
          <div className="column center" style={{ flex: 1 }}>
            <div className="column p-16" style={{ height: "100%", justifyContent: "space-between", gap: 24 }}>
              <div style={{ height: "100%", width: "100%" }}>{<Component onNextStep={onNextStep} onPreviousStep={onPreviousStep} />}</div>
              <ButtonStrip start>
                <Button disabled={!hasPreviousStep} onClick={onPreviousStep}>
                  {`Previous: ${stepsManagement[currentIndex - 1]?.label ?? ""}`}
                </Button>
                <Button
                  primary
                  disabled={false}
                  onClick={hasNextStep ? onNextStep : onLastAction}
                  className="settings-next-button"
                  dataTest="scorecard-admin-next-button">
                  {!hasNextStep ? onLastActionButtonName : `Next: ${stepsManagement[currentIndex + 1]?.label}`}
                </Button>
              </ButtonStrip>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
