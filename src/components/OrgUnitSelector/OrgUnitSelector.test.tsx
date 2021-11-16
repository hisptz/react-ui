import { mount } from "@cypress/react";
import { Provider } from "@dhis2/app-runtime";
import React from "react";
import { OrgUnitSelectorValue } from "./types";
import OrgUnitSelector from "./index";

const appConfig = {
  baseUrl: Cypress.env("dhis2BaseUrl"),
  apiVersion: Cypress.env("dhis2ApiVersion"),
};

const DHIS2Provider = ({ children }: { children: any }) => <Provider config={appConfig}>{children}</Provider>;

describe("Org Unit Selector", () => {
  it("should render", function () {
    mount(
      <DHIS2Provider>
        <OrgUnitSelector value={{ orgUnits: [], levels: [] }} onUpdate={() => {}} />
      </DHIS2Provider>
    );
  });

  it("should render with user options", function () {
    mount(
      <DHIS2Provider>
        <OrgUnitSelector value={{ orgUnits: [], levels: [] }} onUpdate={() => {}} />
      </DHIS2Provider>
    );
  });
  it("should render with levels", function () {
    mount(
      <DHIS2Provider>
        <OrgUnitSelector value={{ orgUnits: [], levels: [] }} onUpdate={() => {}} showLevels />
      </DHIS2Provider>
    );
    cy.get("[data-test='levels-selector']").should("exist");
  });
  it("should render with groups", function () {
    mount(
      <DHIS2Provider>
        <OrgUnitSelector value={{ orgUnits: [], levels: [] }} onUpdate={() => {}} showGroups />
      </DHIS2Provider>
    );
    cy.get("[data-test='groups-selector']").should("exist");
  });

  it("should return the selected org unit", function () {
    let selectedOrgUnit: OrgUnitSelectorValue;
    const onSelect = (orgUnitSelection: OrgUnitSelectorValue) => {
      console.log(JSON.stringify(orgUnitSelection));
      selectedOrgUnit = orgUnitSelection;
    };

    mount(
      <DHIS2Provider>
        <OrgUnitSelector value={{ orgUnits: [] }} showLevels onUpdate={onSelect} />
      </DHIS2Provider>
    );

    cy.get("[data-test=dhis2-uicore-checkbox]")
      .click()
      .then(() => {
        expect(selectedOrgUnit.orgUnits?.length).to.equal(1);
      });
    cy.get("[data-test='levels-selector']").click();
    cy.get("[data-test='Facility-option']")
      .click()
      .then(() => {
        expect(selectedOrgUnit.levels?.length).to.equal(1);
      });
  });

  it("should accept previously defined values", function () {
    const values: OrgUnitSelectorValue = {
      orgUnits: [
        {
          id: "ImspTQPwCqd",
          displayName: "Sierra Leone",
          path: "/ImspTQPwCqd",
        },
      ],
      levels: ["m9lBJogzE95"],
    };

    mount(
      <DHIS2Provider>
        <OrgUnitSelector value={values} showGroups showLevels onUpdate={() => {}} />
      </DHIS2Provider>
    );
  });
});
