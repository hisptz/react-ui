import { mount } from "@cypress/react";
import { Provider } from "@dhis2/app-runtime";
import React from "react";
import OrgUnitSelector from "../OrgUnitSelector";
import { OrgUnitSelectorValue } from "../OrgUnitSelector/types";
import { Period } from "../PeriodSelector/components/CalendarSpecificPeriodDimension/interfaces/period";
import { PeriodSelectorModal } from "./index";

const appConfig = {
  baseUrl: Cypress.env("dhis2BaseUrl"),
  apiVersion: Cypress.env("dhis2ApiVersion"),
};

const DHIS2Provider = ({ children }: { children: any }) => <Provider config={appConfig}>{children}</Provider>;

describe("Period Modals test", () => {
  it("should render", function () {
    mount(<PeriodSelectorModal onClose={() => {}} hide={false} onUpdate={() => {}} />);
  });

  it("should return selected periods when onUpdate is clicked", () => {
    let selectedPeriod: Period;
    const onUpdate = (items: Array<Period>) => {
      selectedPeriod = items[0];
    };
    mount(<PeriodSelectorModal hide={false} selectedPeriods={[]} onUpdate={onUpdate} onClose={() => {}} />);

    cy.get('[data-test="fixed-tab"]').click();
    cy.get('[data-test="fixed-period-type-selector"]').click();
    cy.get('[data-test="Yearly-type"]').click({ force: true });
    cy.get('[data-test="2020-option"]').dblclick();
    cy.get('[data-test="modal-update-button"]')
      .click()
      .then(() => {
        expect(selectedPeriod?.id).to.equal("2020");
      });
  });
});

describe("Org Unit Modal test", () => {
  it("should render", () => {
    mount(
      <DHIS2Provider>
        <OrgUnitSelector value={{ orgUnits: [], levels: [] }} onUpdate={() => {}} />
      </DHIS2Provider>
    );
  });

  it("should return selected org unit configuration", () => {
    let orgUnitSelection: OrgUnitSelectorValue;
    const onUpdate = (orgUnitSelectionValue: OrgUnitSelectorValue) => {
      orgUnitSelection = orgUnitSelectionValue;
    };

    mount(
      <DHIS2Provider>
        <OrgUnitSelector value={{ orgUnits: [], levels: [] }} onUpdate={onUpdate} />
      </DHIS2Provider>
    );

    cy.get('[data-test="user-org-unit"]').click();
    cy.get('[data-test="modal-update-button"]')
      .click()
      .then(() => {
        expect(orgUnitSelection?.userOrgUnit).to.equal(true);
      });
  });
});
