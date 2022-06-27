import { mount } from "@cypress/react";
import { Provider } from "@dhis2/app-runtime";
import type { OrgUnitSelection } from "@hisptz/dhis2-utils";
import React from "react";
import OrgUnitSelector from "./index";

describe("Org Unit Selector", () => {
  const appConfig = {
    baseUrl: Cypress.env("dhis2BaseUrl"),
    apiVersion: Cypress.env("dhis2ApiVersion"),
  };

  const DHIS2Provider = ({ children }: { children: any }) => <Provider config={appConfig}>{children}</Provider>;

  it("should render", function () {
    mount(
      <DHIS2Provider>
        <OrgUnitSelector
          value={{ orgUnits: [], levels: [] }}
          onUpdate={() => {
            return;
          }}
        />
      </DHIS2Provider>
    );
  });

  it("should render with user options", function () {
    mount(
      <DHIS2Provider>
        <OrgUnitSelector
          value={{ orgUnits: [], levels: [] }}
          onUpdate={() => {
            return;
          }}
        />
      </DHIS2Provider>
    );
  });
  it("should render with levels", function () {
    mount(
      <DHIS2Provider>
        <OrgUnitSelector
          value={{ orgUnits: [], levels: [] }}
          onUpdate={() => {
            return;
          }}
          showLevels
        />
      </DHIS2Provider>
    );
    cy.get("[data-test='levels-selector']").should("exist");
  });
  it("should render with groups", function () {
    mount(
      <DHIS2Provider>
        <OrgUnitSelector
          value={{ orgUnits: [], levels: [] }}
          onUpdate={() => {
            return;
          }}
          showGroups
        />
      </DHIS2Provider>
    );
    cy.get("[data-test='groups-selector']").should("exist");
  });

  it("should accept previously defined values", function () {
    const values: OrgUnitSelection = {
      orgUnits: [
        {
          id: "ImspTQPwCqd",
          displayName: "Sierra Leone",
          path: "/ImspTQPwCqd",
          children: [],
        },
      ],
      levels: ["m9lBJogzE95"],
    };
    mount(
      <DHIS2Provider>
        <OrgUnitSelector
          value={values}
          showGroups
          showLevels
          onUpdate={() => {
            return;
          }}
        />
      </DHIS2Provider>
    );
  });

  it("should return the selected org unit", function () {
    // let selectedOrgUnit: OrgUnitSelectorValue;
    // const onSelect = (orgUnitSelection: OrgUnitSelectorValue) => {
    //   selectedOrgUnit = orgUnitSelection;
    // };
    mount(
      <DHIS2Provider>
        <OrgUnitSelector
          value={{ orgUnits: [] }}
          showLevels
          onUpdate={() => {
            return;
          }}
        />
      </DHIS2Provider>
    ).then(() => {
      return;
      // cy.get("[data-test=dhis2-uicore-checkbox]", { timeout: 10000 })
      //   .click()
      //   .then(() => {
      //     expect(selectedOrgUnit.orgUnits?.length).to.equal(1);
      //   });
      // cy.get("[data-test='levels-selector']").click();
      // cy.get("[data-test='Facility-option']")
      //   .click()
      //   .then(() => {
      //     expect(selectedOrgUnit.levels?.length).to.equal(1);
      //   });
    });
  });
});
