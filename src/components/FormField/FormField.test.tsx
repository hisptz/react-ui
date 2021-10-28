import { mount } from "@cypress/react";
import React from "react";
import { VALUE_TYPES } from "components/FormField/constants";
import { Input } from "components/FormField/index";

describe("Form Input Tests", () => {
  it("should render", function () {
    mount(
      <Input
        input={{
          name: "name",
          onChange: () => {},
        }}
        valueType={VALUE_TYPES.TEXT.name}
      />
    );
  });
});
