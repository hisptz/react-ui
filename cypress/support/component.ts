import "./commands";
import { enableAutoLogin, enableNetworkShim } from "@dhis2/cypress-commands";
import { mount } from "cypress/react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", mount);
enableAutoLogin();
enableNetworkShim();
