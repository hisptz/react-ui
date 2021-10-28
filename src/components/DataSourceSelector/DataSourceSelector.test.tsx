import { mount } from "@cypress/react";
import { Provider } from "@dhis2/app-runtime";
import React from "react";
import DataSourceSelector from "components/DataSourceSelector/index";

const appConfig = {
  baseUrl: Cypress.env("dhis2BaseUrl"),
  apiVersion: Cypress.env("dhis2ApiVersion"),
};

const DHIS2Provider = ({ children }: { children: any }) => <Provider config={appConfig}>{children}</Provider>;

describe("Data Source Selector tests", () => {
  it("should render", function () {
    mount(
      <DHIS2Provider>
        <DataSourceSelector onSubmit={() => {}} />
      </DHIS2Provider>
    );
  });

  it("should", function () {});
});
