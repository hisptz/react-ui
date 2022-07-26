import { mount } from "@cypress/react";
import React from "react";
import DataSourceProvider from "../../dataProviders/dataSourceProvider";
import DataSourceSelector from "./index";

const appConfig = {
  baseUrl: Cypress.env("dhis2BaseUrl"),
  apiVersion: Cypress.env("dhis2ApiVersion"),
};

describe("Data Source Selector tests", () => {
  it("should render", function () {
    mount(
      <DataSourceProvider>
        <DataSourceSelector
          onSelect={() => {
            return;
          }}
        />
      </DataSourceProvider>
    );
  });

  it("should", function () {
    return;
  });
});
