import i18n from "@dhis2/d2-i18n";
import {
  Box,
  CenteredContent,
  CheckboxField,
  CircularLoader,
  colors,
  IconError24,
  MultiSelectField,
  MultiSelectOption,
  OrganisationUnitTree,
  InputField,
} from "@dhis2/ui";
import type { OrganisationUnit } from "@hisptz/dhis2-utils";
import { intersectionWith } from "lodash";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useFilterOrgUnits, useOrgUnitLevelsAndGroups, useOrgUnitsRoot } from "../hooks";
import { OrgUnitSelectorProps } from "../types";
import "../../../styles/styles.css";
import "../styles/styles.css";
import {
  isOrgUnitSelected,
  onDeselectOrgUnit,
  onGroupSelect,
  onLevelSelect,
  onSelectOrgUnit,
  onUserOrUnitChange,
  onUserSubUnitsChange,
  onUserSubX2Units,
} from "../utils";

export default function OrgUnitSelector({ value, onUpdate, showLevels, showUserOptions, showGroups, singleSelection, searchable }: OrgUnitSelectorProps) {
  const { roots, error, loading } = useOrgUnitsRoot();
  const { orgUnits: selectedOrgUnits = [], levels: selectedLevels, groups: selectedGroups, userOrgUnit, userSubUnit, userSubX2Unit } = value ?? {};
  const { groups, levels, error: levelsAndGroupsError, loading: levelsAndGroupsLoading } = useOrgUnitLevelsAndGroups();
  const { filteredOrgUnits, filtering, searchValue, setSearchValue, handleExpand, expanded } = useFilterOrgUnits(selectedOrgUnits);
  const disableSelections = useMemo(() => userOrgUnit || userSubX2Unit || userSubUnit, [userOrgUnit, userSubUnit, userSubX2Unit]);

  if (error) {
    return (
      <div className="column center align-items-center" style={{ height: 400, width: 500 }}>
        <IconError24 style={{ color: colors.grey700 }} />
        <p style={{ color: colors.grey700 }}>{error.message ?? "Something went wrong"}</p>
      </div>
    );
  }

  const sanitizedSelectedLevels = intersectionWith(selectedLevels, levels, (levelId, level) => levelId === level.id);
  const sanitizedSelectedGroups = intersectionWith(selectedGroups, levels, (groupId, group) => groupId === group.id);

  return (
    <Box minHeight="400px" maxWidth={"700px"} minWidth={"500px"}>
      {levelsAndGroupsLoading || loading ? (
        <div style={{ minHeight: 400 }} className="column align-items-center center w-100 h-100">
          <CircularLoader small />
        </div>
      ) : (
        <Fragment>
          <div style={{ minHeight: 400, maxHeight: 500, overflow: "hidden" }} className="container-bordered">
            {showUserOptions && (
              <div data-test="user-options-selector" style={{ background: colors.grey200 }} className="row space-between p-16">
                <CheckboxField
                  dataTest={"user-org-unit"}
                  checked={userOrgUnit}
                  onChange={onUserOrUnitChange({ onUpdate, value })}
                  label={i18n.t("User organisation unit")}
                />
                <CheckboxField
                  dataTest={"user-sub-org-unit"}
                  checked={userSubUnit}
                  onChange={onUserSubUnitsChange({ onUpdate, value })}
                  label={i18n.t("User sub-units")}
                />
                <CheckboxField
                  dataTest={"user-sub-x2-org-unit"}
                  checked={userSubX2Unit}
                  onChange={onUserSubX2Units({ onUpdate, value })}
                  label={i18n.t("User sub-x2-units")}
                />
              </div>
            )}
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
                    filter={filteredOrgUnits}
                    disableSelection={disableSelections}
                    selected={selectedOrgUnits?.map(({ path }) => path)}
                    expanded={expanded}
                    handleExpand={handleExpand}
                    handleCollapse={handleExpand}
                    roots={roots?.map(({ id }: { id: string }) => id)}
                    onChange={(orgUnit: { id: string }) => {
                      if (isOrgUnitSelected(selectedOrgUnits, orgUnit as OrganisationUnit)) {
                        onDeselectOrgUnit(orgUnit as OrganisationUnit, selectedOrgUnits, { onUpdate, value });
                      } else {
                        onSelectOrgUnit(orgUnit, selectedOrgUnits, { onUpdate, value });
                      }
                    }}
                    singleSelection={singleSelection}
                  />
                </div>
              )}
              {loading && !error && (
                <CenteredContent>
                  <CircularLoader small />
                </CenteredContent>
              )}
            </div>
          </div>
          {(showLevels || showGroups) && (
            <div className="row pt-32" style={{ gap: 16 }}>
              {showLevels && (
                <div data-test="levels-selector" className="column w-100">
                  <MultiSelectField
                    disabled={disableSelections || levelsAndGroupsLoading}
                    clearable
                    loading={levelsAndGroupsLoading}
                    error={levelsAndGroupsError}
                    validationText={levelsAndGroupsError?.message}
                    onChange={onLevelSelect({ onUpdate, value })}
                    selected={levelsAndGroupsLoading ? [] : sanitizedSelectedLevels}
                    clearText={i18n.t("Clear")}
                    label={i18n.t("Select Level(s)")}>
                    {levels?.map(({ displayName, id }: { displayName: string; id: string }) => (
                      <MultiSelectOption dataTest={`${displayName}-option`} label={displayName} value={id} key={id} />
                    ))}
                  </MultiSelectField>
                </div>
              )}
              {showGroups && (
                <div data-test="groups-selector" className="column w-100">
                  <MultiSelectField
                    disabled={disableSelections || levelsAndGroupsLoading}
                    clearable
                    loading={levelsAndGroupsLoading}
                    error={levelsAndGroupsError}
                    validationText={levelsAndGroupsError?.message}
                    onChange={onGroupSelect({ onUpdate, value })}
                    selected={levelsAndGroupsLoading ? [] : sanitizedSelectedGroups}
                    dataTest={"select-facility-group"}
                    clearText={i18n.t("Clear")}
                    label={i18n.t("Select Group(s)")}>
                    {/* eslint-disable react/no-unused-prop-types */}
                    {groups?.map(({ displayName, id }: { displayName: string; id: string }) => (
                      <MultiSelectOption dataTest={`${displayName}-option`} label={displayName} value={id} key={id} />
                    ))}
                  </MultiSelectField>
                </div>
              )}
            </div>
          )}
        </Fragment>
      )}
    </Box>
  );
}
