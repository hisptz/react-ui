import { mount } from "@cypress/react";
import { Provider } from "@dhis2/app-runtime";
import React from "react";
import DataSourceSelector from "./index";

const appConfig = {
  baseUrl: Cypress.env("dhis2BaseUrl"),
  apiVersion: Cypress.env("dhis2ApiVersion"),
};

const DHIS2Provider = ({ children }: { children: any }) => <Provider config={appConfig}>{children}</Provider>;

describe("Data Source Selector tests", () => {
  it("should render", function () {
    mount(
      <DHIS2Provider>
        <DataSourceSelector
          onSelect={() => {
            return;
          }}
        />
      </DHIS2Provider>
    );
  });

  it("should", function () {
    return;
  });
});
