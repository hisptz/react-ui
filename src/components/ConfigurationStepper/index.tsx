/* eslint-disable no-unused-vars */
import { Button, ButtonStrip } from "@dhis2/ui";
import { Step, StepLabel, Stepper } from "@material-ui/core";
import { findIndex } from "lodash";
import React, { Suspense, useMemo, useState, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import { ConfigurationStepperProps, StepsList } from "./types/props";
import FullPageLoader from "core/shared-components/FullPageLoader";
import "./styles/index.css";

export default function ConfigurationStepper({
  stepsManagement,
  onLastAction,
  activeStepperBackGroundColor,
  onCancelLastAction,
  onLastActionButtonName,
}: ConfigurationStepperProps) {
  const [routeState, setRouteState] = useState({
    previous: "/",
  });
  const history = useHistory();

  const onNavigate = () => {
    setRouteState({
      ...routeState,
      previous: "/edit/stepperid",
    });
    history.replace(routeState?.previous);
  };

  const [saving, setSaving] = useState(false);
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

  return (
    <Suspense fallback={<FullPageLoader />}>
      <div className="column">
        <Stepper>
          {stepsManagement?.map((step) => (
            <Step
              id="stepper"
              style={step.label === activeStep.label ? { background: activeStepperBackGroundColor } : undefined}
              active={step.label === activeStep.label}
              onClick={() => setActiveStep(step)}
              key={`${step.label}-step`}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className="row">
        <div className="column center" style={{ flex: 1 }}>
          <div className="column p-16" style={{ height: "100%", justifyContent: "space-between" }}>
            <div style={{ height: "100%", width: "100%" }}>{<Component onNextStep={onNextStep} onPreviousStep={onPreviousStep} />}</div>
            <ButtonStrip start>
              <Button disabled={!hasPreviousStep} onClick={onPreviousStep}>
                {`Previous: ${stepsManagement[currentIndex - 1]?.label ?? ""}`}
              </Button>
              <Button
                primary
                disabled={saving}
                onClick={hasNextStep ? onNextStep : onLastAction}
                className="settings-next-button"
                dataTest="scorecard-admin-next-button">
                {!hasNextStep ? (saving ? `${"Execute action "}...` : onLastActionButtonName) : `Next: ${stepsManagement[currentIndex + 1]?.label}`}
              </Button>
            </ButtonStrip>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

