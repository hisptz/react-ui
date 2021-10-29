import i18n from "@dhis2/d2-i18n";
import { Box, CenteredContent, CheckboxField, CircularLoader, colors, MultiSelectField, MultiSelectOption, OrganisationUnitTree } from "@dhis2/ui";
import ErrorIcon from "@material-ui/icons/Error";
import { cloneDeep, find, isEmpty, remove } from "lodash";
import PropTypes from "prop-types";
import React, { Fragment, useMemo } from "react";
import { useOrgUnitLevelsAndGroups, useOrgUnitsRoot } from "../hooks";
import { OrgUnitSelectorProps } from "components/OrgUnitSelector/types";
import "styles/styles.css";
import "../styles/styles.css";

export default function OrgUnitSelector({ value, onUpdate, showLevels, showUserOptions, showGroups, singleSelection }: OrgUnitSelectorProps) {
  const { roots, error, loading } = useOrgUnitsRoot();
  const { orgUnits: selectedOrgUnits = [], levels: selectedLevels, groups: selectedGroups, userOrgUnit, userSubUnit, userSubX2Unit } = value || {};
  const { groups, levels, error: levelsAndGroupsError, loading: levelsAndGroupsLoading } = useOrgUnitLevelsAndGroups();

  function isOrgUnitSelected(orgUnit: { id: any | string }) {
    return !isEmpty(find(selectedOrgUnits, ["id", orgUnit?.id]));
  }

  const onSelectOrgUnit = (orgUnit: any) => {
    if (onUpdate) {
      onUpdate({
        ...value,
        orgUnits: [...selectedOrgUnits, orgUnit],
      });
    }
  };

  const onDeselectOrgUnit = (orgUnit: { id: any | string }) => {
    const updateValue = cloneDeep(selectedOrgUnits);
    remove(updateValue, ["id", orgUnit.id]);
    if (onUpdate) {
      onUpdate({
        ...value,
        orgUnits: updateValue,
      });
    }
  };
  const onLevelSelect = ({ selected }: { selected: Array<string> }) => {
    if (onUpdate) {
      onUpdate({
        ...value,
        levels: selected,
      });
    }
  };

  const onGroupSelect = ({ selected }: { selected: Array<string> }) => {
    if (onUpdate) {
      onUpdate({
        ...value,
        groups: selected,
      });
    }
  };

  const onUserOrUnitChange = ({ checked }: { checked: boolean }) => {
    if (onUpdate) {
      onUpdate({
        ...value,
        userOrgUnit: checked,
        orgUnits: [],
        levels: [],
        groups: [],
      });
    }
  };
  const onUserSubUnitsChange = ({ checked }: { checked: boolean }) => {
    if (onUpdate) {
      onUpdate({
        ...value,
        userSubUnit: checked,
        orgUnits: [],
        levels: [],
        groups: [],
      });
    }
  };

  const onUserSubX2Units = ({ checked }: { checked: boolean }) => {
    if (onUpdate) {
      onUpdate({
        ...value,
        userSubX2Unit: checked,
        orgUnits: [],
        levels: [],
        groups: [],
      });
    }
  };

  const disableSelections = useMemo(() => userOrgUnit || userSubX2Unit || userSubUnit, [userOrgUnit, userSubUnit, userSubX2Unit]);

  if (error) {
    return (
      <div className="column center align-items-center" style={{ height: 400, width: 500 }}>
        <ErrorIcon style={{ color: colors.grey700 }} />
        <p style={{ color: colors.grey700 }}>{error.message ?? "Something went wrong"}</p>
      </div>
    );
  }

  return (
    <Box minHeight="400px" maxWidth={"700px"} minWidth={"500px"}>
      {levelsAndGroupsLoading || loading ? (
        <div className="column align-items-center center w-100 h-100">
          <CircularLoader small />
        </div>
      ) : (
        <Fragment>
          <div style={{ minHeight: 400, maxHeight: 500, overflow: "hidden" }} className="container-bordered">
            {showUserOptions && (
              <div data-test="user-options-selector" style={{ background: colors.grey200 }} className="row space-between p-16">
                <CheckboxField checked={userOrgUnit} onChange={onUserOrUnitChange} label={i18n.t("User organisation unit")} />
                <CheckboxField checked={userSubUnit} onChange={onUserSubUnitsChange} label={i18n.t("User sub-units")} />
                <CheckboxField checked={userSubX2Unit} onChange={onUserSubX2Units} label={i18n.t("User sub-x2-units")} />
              </div>
            )}
            {error && (
              <CenteredContent>
                <p>{error?.message || error.toString()}</p>
              </CenteredContent>
            )}
            <div className="p-16" style={{ maxHeight: 500, overflow: "auto" }}>
              {roots && (
                <div style={disableSelections ? { opacity: 0.3, cursor: "not-allowed" } : {}}>
                  <OrganisationUnitTree
                    disableSelection={disableSelections}
                    selected={selectedOrgUnits?.map(({ path }) => path)}
                    initiallyExpanded={selectedOrgUnits?.map(({ path }) => path)}
                    roots={roots?.map(({ id }: { id: string }) => id)}
                    onChange={(orgUnit: { id: string }) => {
                      if (isOrgUnitSelected(orgUnit)) {
                        onDeselectOrgUnit(orgUnit);
                      } else {
                        onSelectOrgUnit(orgUnit);
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
            <div className="row pt-32 w-75 space-between">
              {showLevels && (
                <div data-test="levels-selector" className="column w-100">
                  <MultiSelectField
                    disabled={disableSelections}
                    clearable
                    loading={levelsAndGroupsLoading}
                    error={levelsAndGroupsError}
                    validationText={levelsAndGroupsError?.message}
                    onChange={onLevelSelect}
                    selected={selectedLevels}
                    clearText={i18n.t("Clear")}
                    label={i18n.t("Select Level(s)")}>
                    {levels?.map(({ displayName, id }: { displayName: string; id: string }) => (
                      <MultiSelectOption label={displayName} value={id} key={id} />
                    ))}
                  </MultiSelectField>
                </div>
              )}
              {showGroups && (
                <div data-test="groups-selector" className="column w-100">
                  <MultiSelectField
                    disabled={disableSelections}
                    clearable
                    loading={levelsAndGroupsLoading}
                    error={levelsAndGroupsError}
                    validationText={levelsAndGroupsError?.message}
                    onChange={onGroupSelect}
                    selected={selectedGroups}
                    dataTest={"select-facility-group"}
                    clearText={i18n.t("Clear")}
                    label={i18n.t("Select Group(s)")}>
                    {/* eslint-disable react/no-unused-prop-types */}
                    {groups?.map(({ displayName, id }: { displayName: string; id: string }) => (
                      <MultiSelectOption label={displayName} value={id} key={id} />
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

OrgUnitSelector.propTypes = {
  value: PropTypes.object.isRequired,
  showGroups: PropTypes.bool,
  showLevels: PropTypes.bool,
  showUserOptions: PropTypes.bool,
  onUpdate: PropTypes.func,
};
