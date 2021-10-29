import { mount } from "@cypress/react";
import { Provider } from "@dhis2/app-runtime";
import React from "react";
import OrgUnitSelector from "components/OrgUnitSelector";

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
});
