import { mount } from "@cypress/react";
import React from "react";
import CircularProgressDashboard from ".";

describe("CircularProgressDashboard", () => {
  it("should render", () => {
    mount(<CircularProgressDashboard size="100px" />);
  });
});
