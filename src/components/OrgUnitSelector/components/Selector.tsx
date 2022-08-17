import { Box, CenteredContent, CircularLoader, colors, IconError24 } from "@dhis2/ui";
import React, { Fragment, useMemo } from "react";
import { useOrgUnitsRoot } from "../hooks";
import { OrgUnitSelectorProps } from "../types";
import "../../../styles/styles.css";
import "../styles/styles.css";
import { LevelAndGroupSelector } from "./LevelAndGroupSelector";
import { OrgUnitSearch } from "./OrgUnitSearch";
import { OrgUnitTree } from "./OrgUnitTree";
import { OrgUnitUserOptions } from "./OrgUnitUserOptions";

export default function OrgUnitSelector({
  value,
  onUpdate,
  showLevels,
  showUserOptions,
  showGroups,
  singleSelection,
  searchable,
  limitSelectionToLevels,
}: OrgUnitSelectorProps) {
  const { roots, error, loading } = useOrgUnitsRoot();
  const { userOrgUnit, userSubUnit, userSubX2Unit } = value ?? {};
  const disableSelections = useMemo(() => userOrgUnit || userSubX2Unit || userSubUnit, [userOrgUnit, userSubUnit, userSubX2Unit]);

  if (error) {
    return (
      <div className="column center align-items-center" style={{ height: 400, width: 500 }}>
        <IconError24 style={{ color: colors.grey700 }} />
        <p style={{ color: colors.grey700 }}>{error.message ?? "Something went wrong"}</p>
      </div>
    );
  }

  return (
    <Box minHeight="400px" maxWidth={"700px"} minWidth={"500px"}>
      {loading ? (
        <div style={{ minHeight: 400 }} className="column align-items-center center w-100 h-100">
          <CircularLoader small />
        </div>
      ) : (
        <Fragment>
          <div style={{ minHeight: 400, maxHeight: 500, overflow: "hidden" }} className="container-bordered">
            {showUserOptions && <OrgUnitUserOptions value={value} onUpdate={onUpdate} />}
            {error && (
              <CenteredContent>
                <p>{error?.message || error.toString()}</p>
              </CenteredContent>
            )}
            <div className="p-16">
              <OrgUnitSearch searchable={searchable} />
              {roots && (
                <OrgUnitTree
                  limitSelectionToLevels={limitSelectionToLevels}
                  value={value}
                  onUpdate={onUpdate}
                  roots={roots}
                  disableSelections={disableSelections}
                  singleSelection={singleSelection}
                />
              )}
              {loading && !error && (
                <CenteredContent>
                  <CircularLoader small />
                </CenteredContent>
              )}
            </div>
          </div>
          {(showLevels || showGroups) && (
            <LevelAndGroupSelector showLevels={showLevels} disableSelections={disableSelections} onUpdate={onUpdate} value={value} showGroups={showGroups} />
          )}
        </Fragment>
      )}
    </Box>
  );
}
