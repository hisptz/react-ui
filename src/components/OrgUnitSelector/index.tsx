import { CssReset } from "@dhis2/ui";
import React from "react";
import Selector from "./components/Selector";
import { OrgUnitSelectorProps } from "./types";

export default function OrgUnitSelector(props: OrgUnitSelectorProps) {
  return (
    <div style={{ margin: 4 }}>
      <CssReset />
      <Selector {...props} />
    </div>
  );
}
