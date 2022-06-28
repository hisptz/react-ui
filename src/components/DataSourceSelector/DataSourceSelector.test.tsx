import { mount } from "@cypress/react";
import React from "react";
import { DHIS2Provider } from "../../core/tests";
import DataSourceSelector from "./index";

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
});
