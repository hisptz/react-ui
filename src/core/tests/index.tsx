import { Provider } from "@dhis2/app-runtime";
import React from "react";

const appConfig = {
  baseUrl: Cypress.env("dhis2BaseUrl"),
  apiVersion: Cypress.env("dhis2ApiVersion"),
};

export const DHIS2Provider = ({ children }: { children: any }) => <Provider config={appConfig}>{children}</Provider>;
