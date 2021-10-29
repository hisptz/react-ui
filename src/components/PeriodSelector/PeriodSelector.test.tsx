import { mount } from "@cypress/react";
import React from "react";
import { Period } from "components/PeriodSelector/components/CalendarSpecificPeriodDimension/interfaces/period";
import PeriodSelector from "components/PeriodSelector/index";

describe("Period Selector Tests", () => {
  it("Renders", () => {
    mount(<PeriodSelector onSelect={() => {}} selectedPeriods={[]} />);
  });

  it("should exclude fixed periods", function () {
    mount(<PeriodSelector selectedPeriods={[]} onSelect={() => {}} excludeFixedPeriods />);
    cy.get('[data-test="relative-tab"]').should("be.visible");
    cy.get('[data-test="fixed-tab"]').should("not.exist");
  });

  it("should exclude relative periods", function () {
    mount(<PeriodSelector selectedPeriods={[]} onSelect={() => {}} excludeRelativePeriods />);
    cy.get('[data-test="fixed-tab"]').should("be.visible");
    cy.get('[data-test="relative-tab"]').should("not.exist");
  });

  it("should throw an error if both fixed and relative periods are excluded", function () {
    expect(() => mount(mount(<PeriodSelector selectedPeriods={[]} onSelect={() => {}} excludeRelativePeriods excludeFixedPeriods />))).to.throw;
  });

  it("should not have the period types specified in the excludedPeriodTypes array", function () {
    const excludedPeriodTypes = ["Weekly", "Monthly"];
    mount(<PeriodSelector selectedPeriods={[]} onSelect={() => {}} excludedPeriodTypes={excludedPeriodTypes} />);
    cy.get('[data-test="fixed-tab"]').click();
    cy.get('[data-test="fixed-period-type-selector"]').click();
    cy.get('[data-test="Weekly-type"]').should("not.exist");
    cy.get('[data-test="Monthly-type"]').should("not.exist");
    cy.get('[data-test="Yearly-type"]').should("exist");
  });

  it("should list on periods of the selected type", function () {
    mount(<PeriodSelector selectedPeriods={[]} onSelect={() => {}} />);
    cy.get('[data-test="fixed-tab"]').click();
    cy.get('[data-test="fixed-period-type-selector"]').click();
    cy.get('[data-test="Yearly-type"]').click({ force: true });

    const previousYears = Array.from({ length: 9 }, (_, i) => new Date().getFullYear() - (i + 1));
    previousYears.forEach((prevYear) => {
      const identifier = `data-test="${prevYear}-option"`;
      cy.get(`[${identifier}]`).should("exist");
    });
  });

  it("should return a selected period", function () {
    let selectedPeriod: Period;
    const onSelect = ({ items }: { items: Array<Period> }) => {
      selectedPeriod = items[0];
    };
    mount(<PeriodSelector selectedPeriods={[]} onSelect={onSelect} />);
    cy.get('[data-test="fixed-tab"]').click();
    cy.get('[data-test="fixed-period-type-selector"]').click();
    cy.get('[data-test="Yearly-type"]').click({ force: true });
    cy.get('[data-test="2020-option"]')
      .dblclick()
      .then(() => {
        expect(selectedPeriod?.id).to.equal("2020");
      });

    // @ts-ignore
  });
});
