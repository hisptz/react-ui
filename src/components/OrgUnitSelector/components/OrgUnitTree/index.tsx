import { OrganisationUnitTree } from "@dhis2/ui";
import type { OrganisationUnit, OrgUnitSelection } from "@hisptz/dhis2-utils";
import React from "react";
import { isOrgUnitSelected, onDeselectOrgUnit, onSelectOrgUnit } from "../../utils";

export function OrgUnitTree({
  value,
  onUpdate,
  disableSelections,
  filter,
  expanded,
  handleExpand,
  roots,
  singleSelection,
}: {
  value: OrgUnitSelection | undefined;
  onUpdate: ((value: OrgUnitSelection) => void) | undefined;
  disableSelections?: boolean;
  singleSelection?: boolean;
  filter: string[];
  expanded: string[];
  handleExpand: (orgUnit: { path: string }) => void;
  roots: OrganisationUnit[];
}) {
  const selectedOrgUnits = value?.orgUnits ?? [];

  const onSelect = (orgUnit: any) => {
    if (isOrgUnitSelected(selectedOrgUnits ?? [], orgUnit as OrganisationUnit)) {
      onDeselectOrgUnit(orgUnit as OrganisationUnit, selectedOrgUnits, { onUpdate, value });
    } else {
      onSelectOrgUnit(orgUnit, selectedOrgUnits, { onUpdate, value });
    }
  };

  return (
    <div
      style={
        disableSelections
          ? {
              opacity: 0.3,
              cursor: "not-allowed",
              overflow: "auto",
            }
          : { overflow: "auto", maxHeight: 400 }
      }>
      <OrganisationUnitTree
        forceReload
        filter={filter}
        disableSelection={disableSelections}
        selected={selectedOrgUnits?.map((orgUnit) => orgUnit.path)}
        expanded={expanded}
        handleExpand={handleExpand}
        handleCollapse={handleExpand}
        roots={roots?.map((root) => root.id)}
        onChange={onSelect}
        singleSelection={singleSelection}
      />
    </div>
  );
}
