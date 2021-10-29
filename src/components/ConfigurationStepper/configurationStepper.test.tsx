import {mount} from "@cypress/react";
import React from 'react';
import ConfigurationStepper from ".";


describe('Configuration Stepper Selector',()=>{
    it("Should Render",()=>{
mount(<ConfigurationStepper stepsManagement={[
    {
      label:"Determinant",
      component: () => (
        <div className="container">
          <div className="column space-between">
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
          <div className="column space-between">
            <h3>Access </h3>
          </div>
        </div>
      ),
      helpSteps: [],
    },
  ]} onLastAction={function (): void {
    throw new Error("Function not implemented.");
} } activeStepperBackGroundColor={""} onCancelLastAction={function (): void {
    throw new Error("Function not implemented.");
} } onLastActionButtonName={"Save"}/>)
cy.get("#stepper").should('be.visible');
cy.get('[data-test=scorecard-admin-next-button]').click();
cy.get('h3').should('be.visible');
    })

})