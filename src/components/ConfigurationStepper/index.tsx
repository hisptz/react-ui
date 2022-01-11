import i18n from "@dhis2/d2-i18n";
import { Button, ButtonStrip } from "@dhis2/ui";
import { makeStyles, Step, StepLabel, Stepper } from "@material-ui/core";
import { findIndex } from "lodash";
import React, { Suspense, useMemo } from "react";
import FullPageLoader from "../shared/components/FullPageLoader";
import { ConfigurationStepperProps, StepsList } from "./types/props";
import "./styles/index.css";

export default function ConfigurationStepper({
  steps,
  onLastAction,
  activeStepperBackGroundColor,
  onLastActionButtonName,
  onStepChange: onStepChangeHandler,
  setActiveStep,
  activeStep,
}: ConfigurationStepperProps) {
  const Component = activeStep.component;

  const onNextStep = async () => {
    if (!hasNextStep) {
      onLastAction();
      return;
    }
    const currentStepIndex = findIndex(steps, ["label", activeStep.label]);

    if (onStepChangeHandler !== undefined) {
      if (await onStepChangeHandler(currentStepIndex, currentStepIndex + 1)) {
        if (currentStepIndex !== steps.length - 1 && currentStepIndex <= 0) {
          setActiveStep(steps[currentStepIndex + 1]);
          return;
        }
      } else {
        return;
      }
    }
    if (currentStepIndex !== steps.length - 1 && currentStepIndex >= 0) {
      setActiveStep(steps[currentStepIndex + 1]);
    }
  };

  const onPreviousStep = async () => {
    const currentStepIndex = findIndex(steps, ["label", activeStep.label]);

    if (onStepChangeHandler !== undefined) {
      if (await onStepChangeHandler(currentStepIndex, currentStepIndex - 1)) {
        if (currentStepIndex !== steps.length - 1 && currentStepIndex >= 0) {
          setActiveStep(steps[currentStepIndex - 1]);
          return;
        }
      } else {
        return;
      }
    }

    if (currentStepIndex !== 0) {
      setActiveStep(steps[currentStepIndex - 1]);
    }
  };

  const onStepChange = async (step: StepsList) => {
    if (onStepChangeHandler !== undefined) {
      const currentStepIndex = findIndex(steps, ["label", activeStep.label]);
      const newStepIndex = findIndex(steps, ["label", step.label]);
      if (await onStepChangeHandler(currentStepIndex, newStepIndex)) {
        setActiveStep(step);
      } else {
        return;
      }
    }
    setActiveStep(step);
  };

  const hasNextStep = useMemo(() => findIndex(steps, ["label", activeStep.label]) !== steps.length - 1, [activeStep]);
  const hasPreviousStep = useMemo(() => findIndex(steps, ["label", activeStep.label]) > 0, [activeStep]);

  const currentIndex = useMemo(() => findIndex(steps, ["label", activeStep.label]), [activeStep]);

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
      <div className="column w-100 h-100">
        <Stepper>
          {steps?.map((step) => (
            <Step
              id="stepper"
              className={classes.root}
              style={step.label === activeStep.label ? { background: activeStepperBackGroundColor } : undefined}
              active={step.label === activeStep.label}
              onClick={() => onStepChange(step)}
              key={`${step.label}-step`}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className="row" style={{ flex: 1 }}>
          <div className="column center" style={{ flex: 1, width: "100%" }}>
            <div className="column p-16" style={{ height: "100%", justifyContent: "space-between", gap: 24 }}>
              <div style={{ height: "100%", width: "100%", flex: 1 }}>{<Component onNextStep={onNextStep} onPreviousStep={onPreviousStep} />}</div>
              <ButtonStrip start>
                <Button disabled={!hasPreviousStep} onClick={onPreviousStep}>
                  {`${i18n.t("Previous")}: ${steps[currentIndex - 1]?.label ?? ""}`}
                </Button>
                <Button
                  primary
                  disabled={false}
                  onClick={hasNextStep ? onNextStep : onLastAction}
                  className="settings-next-button"
                  dataTest="scorecard-admin-next-button">
                  {!hasNextStep ? onLastActionButtonName : `${i18n.t("Next")}: ${steps[currentIndex + 1]?.label}`}
                </Button>
              </ButtonStrip>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
