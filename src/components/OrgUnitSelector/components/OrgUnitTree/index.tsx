import i18n from "@dhis2/d2-i18n";
import { OrganisationUnitTree } from "@dhis2/ui";
import type { OrganisationUnit, OrgUnitSelection } from "@hisptz/dhis2-utils";
import { isEmpty } from "lodash";
import React from "react";
import FullPageLoader from "../../../shared/components/FullPageLoader";
import { isOrgUnitSelected, onDeselectOrgUnit, onSelectOrgUnit } from "../../utils";

export function CustomOrgUnitNodeLabel({ node, limitSelectionToLevels }: { node: { displayName: string; level: number }; limitSelectionToLevels?: number[] }) {
  const allowSelection = limitSelectionToLevels?.includes(node.level) ?? true;
  return <div style={!allowSelection ? { opacity: 0.5 } : undefined}>{node.displayName}</div>;
}

export function OrgUnitTree({
  value,
  onUpdate,
  disableSelections,
  filter,
  expanded,
  handleExpand,
  roots,
  singleSelection,
  keyword,
  limitSelectionToLevels,
  filtering,
  searchMode,
}: {
  value: OrgUnitSelection | undefined;
  onUpdate: ((value: OrgUnitSelection) => void) | undefined;
  disableSelections?: boolean;
  singleSelection?: boolean;
  filter: string[];
  expanded: string[];
  handleExpand: (orgUnit: { path: string }) => void;
  roots: OrganisationUnit[];
  keyword?: string;
  limitSelectionToLevels?: number[];
  filtering?: boolean;
  searchMode?: boolean;
}) {
  const selectedOrgUnits = value?.orgUnits ?? [];

  const onSelect = (orgUnit: any) => {
    if (limitSelectionToLevels !== undefined) {
      if (!limitSelectionToLevels.includes(orgUnit.level)) {
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
      ) : (keyword?.length ?? 0) > 3 && isEmpty(filter) && searchMode && !filtering ? (
        <div className="column center align-items-center w-100 h-100">
          <p>
            {i18n.t("Could not find organisation units matching keyword ")}
            <b>{keyword}</b>
          </p>
        </div>
      ) : (
        <OrganisationUnitTree
          forceReload
          filter={filter}
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
