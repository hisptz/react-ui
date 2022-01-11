import i18n from "@dhis2/d2-i18n";
import { Button, ButtonStrip } from "@dhis2/ui";
import { makeStyles, Step, StepLabel, Stepper } from "@material-ui/core";
import { findIndex } from "lodash";
import React, { Suspense, useMemo, useState } from "react";
import FullPageLoader from "../shared/components/FullPageLoader";
import { ConfigurationStepperProps, StepsList } from "./types/props";
import "./styles/index.css";
export default function ConfigurationStepper({
  stepsManagement,
  onLastAction,
  activeStepperBackGroundColor,
  onLastActionButtonName,
  onStepChange: onStepChangeHandler,
}: ConfigurationStepperProps) {
  const [activeStep, setActiveStep] = useState(stepsManagement[0]);
  const Component = activeStep.component;

  const onNextStep = () => {
    if (!hasNextStep) {
      onLastAction();
      return;
    }
    const currentStepIndex = findIndex(stepsManagement, ["label", activeStep.label]);

    if (onStepChangeHandler !== undefined) {
      if (onStepChangeHandler(currentStepIndex, currentStepIndex + 1)) {
        if (currentStepIndex !== stepsManagement.length - 1 && currentStepIndex <= 0) {
          setActiveStep(stepsManagement[currentStepIndex + 1]);
          return;
        }
      } else {
        return;
      }
    }
    if (currentStepIndex !== stepsManagement.length - 1 && currentStepIndex >= 0) {
      setActiveStep(stepsManagement[currentStepIndex + 1]);
    }
  };

  const onPreviousStep = () => {
    const currentStepIndex = findIndex(stepsManagement, ["label", activeStep.label]);

    if (onStepChangeHandler !== undefined) {
      if (onStepChangeHandler(currentStepIndex, currentStepIndex - 1)) {
        if (currentStepIndex !== stepsManagement.length - 1 && currentStepIndex >= 0) {
          setActiveStep(stepsManagement[currentStepIndex - 1]);
          return;
        }
      } else {
        return;
      }
    }

    if (currentStepIndex !== 0) {
      setActiveStep(stepsManagement[currentStepIndex - 1]);
    }
  };

  const onStepChange = (step: StepsList) => {
    if (onStepChangeHandler !== undefined) {
      const currentStepIndex = findIndex(stepsManagement, ["label", activeStep.label]);
      const newStepIndex = findIndex(stepsManagement, ["label", step.label]);
      if (onStepChangeHandler(currentStepIndex, newStepIndex)) {
        setActiveStep(step);
      } else {
        return;
      }
    }
    setActiveStep(step);
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
              onClick={() => onStepChange(step)}
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
                  {`${i18n.t("Previous")}: ${stepsManagement[currentIndex - 1]?.label ?? ""}`}
                </Button>
                <Button
                  primary
                  disabled={false}
                  onClick={hasNextStep ? onNextStep : onLastAction}
                  className="settings-next-button"
                  dataTest="scorecard-admin-next-button">
                  {!hasNextStep ? onLastActionButtonName : `${i18n.t("Next")}: ${stepsManagement[currentIndex + 1]?.label}`}
                </Button>
              </ButtonStrip>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
