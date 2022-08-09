import i18n from "@dhis2/d2-i18n";
import { MultiSelectField, MultiSelectOption } from "@dhis2/ui";
import type { OrgUnitSelection } from "@hisptz/dhis2-utils";
import { intersectionWith } from "lodash";
import React from "react";
import { useOrgUnitLevelsAndGroups } from "../../hooks";
import { onGroupSelect, onLevelSelect } from "../../utils";

export function LevelAndGroupSelector({
  showLevels,
  showGroups,
  value,
  onUpdate,
  disableSelections,
}: {
  showLevels?: boolean;
  showGroups?: boolean;
  value: OrgUnitSelection | undefined;
  onUpdate: ((value: OrgUnitSelection) => void) | undefined;
  disableSelections?: boolean;
}) {
  const { groups, levels, error: levelsAndGroupsError, loading: levelsAndGroupsLoading } = useOrgUnitLevelsAndGroups();

  const sanitizedSelectedLevels = intersectionWith(value?.levels, levels, (levelId, level) => levelId === level.id);
  const sanitizedSelectedGroups = intersectionWith(value?.groups, groups, (groupId, group) => groupId === group.id);

  return (
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
            selected={levelsAndGroupsLoading ? [] : sanitizedSelectedLevels ?? []}
            clearText={i18n.t("Clear")}
            label={i18n.t("Select Level(s)")}>
            {levels?.map(({ displayName, id }: any) => (
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
            selected={levelsAndGroupsLoading ? [] : sanitizedSelectedGroups ?? []}
            dataTest={"select-facility-group"}
            clearText={i18n.t("Clear")}
            label={i18n.t("Select Group(s)")}>
            {groups?.map(({ displayName, id }) => (
              <MultiSelectOption dataTest={`${displayName}-option`} label={displayName} value={id} key={id} />
            ))}
          </MultiSelectField>
        </div>
      )}
    </div>
  );
}
