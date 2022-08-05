import i18n from "@dhis2/d2-i18n";
import { Box, CenteredContent, CircularLoader, colors, IconError24, InputField } from "@dhis2/ui";
import React, { Fragment, useMemo } from "react";
import { useFilterOrgUnits, useOrgUnitsRoot } from "../hooks";
import { OrgUnitSelectorProps } from "../types";
import "../../../styles/styles.css";
import "../styles/styles.css";
import { LevelAndGroupSelector } from "./LevelAndGroupSelector";
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
  filterByGroups,
}: OrgUnitSelectorProps) {
  const { roots, error, loading } = useOrgUnitsRoot();
  const { orgUnits: selectedOrgUnits = [], userOrgUnit, userSubUnit, userSubX2Unit } = value ?? {};
  const { filteredOrgUnits, searchValue, setSearchValue, handleExpand, expanded } = useFilterOrgUnits(selectedOrgUnits);
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
              {searchable && (
                <div className="pb-8">
                  <InputField
                    value={searchValue}
                    onChange={({ value }: { value: string }) => setSearchValue(value)}
                    dense
                    placeholder={i18n.t("Search name, id")}
                  />
                </div>
              )}
              {roots && (
                <OrgUnitTree
                  value={value}
                  onUpdate={onUpdate}
                  expanded={expanded}
                  handleExpand={handleExpand}
                  roots={roots}
                  filter={filteredOrgUnits}
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
