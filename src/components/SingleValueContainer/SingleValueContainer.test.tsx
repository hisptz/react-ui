import { mount } from "@cypress/react";
import React from "react";
import SingleValueContainer from ".";

describe("Single Value Container Tests", () => {
  it("should render", function () {
    const arg = {
      title: "PRIORITY INDICATORS",
      singleValueItems: [
        {
          label: "Total Bookings",
          value: 136,
        },
        {
          label: "At least one dose",
          value: 45,
          percentage: 23,
          color: "#0D47A1",
        },
      ],
    };
    mount(<SingleValueContainer {...arg} />);
  });
});
