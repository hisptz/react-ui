import { CssReset } from "@dhis2/ui";
import React from "react";
import Selector from "./components/Selector";
import { FilterStateProvider } from "./states/filter";
import { OrgUnitSelectorProps } from "./types";

export default function OrgUnitSelector(props: OrgUnitSelectorProps) {
  return (
    <div style={{ margin: 4 }}>
      <CssReset />
      <FilterStateProvider filterByGroups={props.filterByGroups} selectedOrgUnits={props.value?.orgUnits}>
        <Selector {...props} />
      </FilterStateProvider>
    </div>
  );
}
