import { mount } from "@cypress/react";
import React from "react";
import OrgUnitDataProvider from "../../dataProviders/orgUnit";
import { OrgUnitSelectorValue } from "../OrgUnitSelector/types";
import { Period } from "../PeriodSelector/components/PeriodSelect/interfaces/period";
import { OrgUnitSelectorModal, PeriodSelectorModal } from "./index";

const DHIS2Provider = ({ children }: { children: any }) => <OrgUnitDataProvider>{children}</OrgUnitDataProvider>;

describe("Period Modals test", () => {
  it("should render", function () {
    mount(
      <PeriodSelectorModal
        onClose={() => {
          return;
        }}
        hide={false}
        onUpdate={() => {
          return;
        }}
      />
    );
  });

  it("should return selected periods when onUpdate is clicked", () => {
    let selectedPeriod: Period;
    const onUpdate = (items: Array<Period>) => {
      selectedPeriod = items[0];
    };
    mount(
      <PeriodSelectorModal
        hide={false}
        selectedPeriods={[]}
        onUpdate={onUpdate}
        onClose={() => {
          return;
        }}
      />
    );

    cy.get('[data-test="fixed-tab"]').click();
    cy.get('[data-test="fixed-period-type-selector"]').click();
    cy.get('[data-test="Yearly-type"]').click({ force: true });
    cy.get('[data-test="2020-option"]').dblclick();
    cy.get('[data-test="modal-update-button"]')
      .click()
      .then(() => {
        expect(selectedPeriod?.id).to.equal("2020");
        return;
      });
  });
});

describe("Org Unit Modal test", () => {
  it("should render", () => {
    mount(
      <DHIS2Provider>
        <OrgUnitSelectorModal
          hide={false}
          onClose={() => {
            return;
          }}
          value={{ orgUnits: [], levels: [] }}
          onUpdate={() => {
            return;
          }}
        />
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
        <OrgUnitSelectorModal
          hide={false}
          onClose={() => {
            return;
          }}
          showUserOptions
          value={{ orgUnits: [], levels: [] }}
          onUpdate={onUpdate}
        />
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
