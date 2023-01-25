import i18n from "@dhis2/d2-i18n";
import { OrganisationUnitTree } from "@dhis2/ui";
import type { OrganisationUnit, OrgUnitSelection } from "@hisptz/dhis2-utils";
import { isEmpty } from "lodash";
import React, { memo } from "react";
import FullPageLoader from "../../../shared/components/FullPageLoader";
import { useFilterOrgUnits } from "../../hooks";
import { isOrgUnitSelected, onDeselectOrgUnit, onSelectOrgUnit } from "../../utils";

export function CustomOrgUnitNodeLabel({
  node,
  limitSelectionToLevels,
}: {
  node: { displayName: string; level: number; path: string };
  limitSelectionToLevels?: number[];
}) {
  const orgUnitLevel = node.level ?? node.path.split("/").length - 1;
  const allowSelection = limitSelectionToLevels?.includes(orgUnitLevel) ?? true;
  return <div style={!allowSelection ? { opacity: 0.5 } : undefined}>{node.displayName}</div>;
}

function Tree({
  value,
  onUpdate,
  disableSelections,
  roots,
  singleSelection,
  limitSelectionToLevels,
}: {
  value: OrgUnitSelection | undefined;
  onUpdate: ((value: OrgUnitSelection) => void) | undefined;
  disableSelections?: boolean;
  singleSelection?: boolean;
  roots: OrganisationUnit[];
  limitSelectionToLevels?: number[];
}) {
  const { searchMode, searchValue, expanded, filtering, filteredOrgUnits, handleExpand } = useFilterOrgUnits();
  const selectedOrgUnits = value?.orgUnits ?? [];

  const onSelect = (orgUnit: any) => {
    const orgUnitLevel = orgUnit.level ?? orgUnit.path.split("/").length - 1;
    const allowSelection = limitSelectionToLevels?.includes(orgUnitLevel) ?? true;
    if (limitSelectionToLevels !== undefined) {
      if (!allowSelection) {
        return;
      }
    }

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
          : { overflow: "auto", maxHeight: 400, height: 400 }
      }>
      {filtering ? (
        <FullPageLoader small />
      ) : (searchValue?.length ?? 0) > 3 && isEmpty(filteredOrgUnits) && searchMode && !filtering ? (
        <div className="column center align-items-center w-100 h-100">
          <p>
            {i18n.t("Could not find organisation units matching keyword ")}
            <b>{searchValue}</b>
          </p>
        </div>
      ) : (
        <OrganisationUnitTree
          initiallyExpanded={expanded}
          forceReload
          filter={filteredOrgUnits}
          disableSelection={disableSelections}
          selected={selectedOrgUnits?.map((orgUnit) => orgUnit.path)}
          expanded={expanded}
          handleExpand={handleExpand}
          handleCollapse={handleExpand}
          renderNodeLabel={(props: any) => <CustomOrgUnitNodeLabel {...props} limitSelectionToLevels={limitSelectionToLevels} />}
          roots={roots?.map((root) => root.id)}
          onChange={onSelect}
          singleSelection={singleSelection}
        />
      )}
    </div>
  );
}

export const OrgUnitTree = memo(Tree);
