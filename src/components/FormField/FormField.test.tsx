import { mount } from "@cypress/react";
import React from "react";
import { VALUE_TYPES } from "./constants";
import { Input } from "./index";

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
