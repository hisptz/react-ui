import type { OrganisationUnit, OrgUnitSelection } from "@hisptz/dhis2-utils";
import { cloneDeep, find, isEmpty, remove } from "lodash";

type OnUpdate = (updatedOrgUnitSelection: OrgUnitSelection) => void;

interface OrgUnitSetter {
  onUpdate?: OnUpdate;
  value?: OrgUnitSelection;
}

export function isOrgUnitSelected(selectedOrgUnits: OrganisationUnit[], orgUnit: OrganisationUnit): boolean {
  return !isEmpty(find(selectedOrgUnits, ["id", orgUnit?.id]));
}

export const onSelectOrgUnit = (orgUnit: any, selectedOrgUnits: OrganisationUnit[], { onUpdate, value }: OrgUnitSetter) => {
  if (onUpdate) {
    onUpdate({
      ...value,
      orgUnits: [
        ...selectedOrgUnits,
        {
          id: orgUnit?.id,
          displayName: orgUnit?.displayName,
          path: orgUnit?.path,
        } as OrganisationUnit,
      ],
    });
  }
};

export const onDeselectOrgUnit = (orgUnit: OrganisationUnit, selectedOrgUnits: OrganisationUnit[], { onUpdate, value }: OrgUnitSetter) => {
  const updateValue = cloneDeep(selectedOrgUnits);
  remove(updateValue, ["id", orgUnit.id]);
  if (onUpdate) {
    onUpdate({
      ...value,
      orgUnits: updateValue,
    });
  }
};
export const onLevelSelect =
  ({ onUpdate, value }: OrgUnitSetter) =>
  ({ selected }: { selected: Array<string> }) => {
    if (onUpdate) {
      onUpdate({
        ...value,
        levels: selected,
      });
    }
  };

export const onGroupSelect =
  ({ onUpdate, value }: OrgUnitSetter) =>
  ({ selected }: { selected: Array<string> }) => {
    if (onUpdate) {
      onUpdate({
        ...value,
        groups: selected,
      });
    }
  };

export const onUserOrUnitChange =
  ({ onUpdate, value }: OrgUnitSetter) =>
  ({ checked }: { checked: boolean }) => {
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
export const onUserSubUnitsChange =
  ({ onUpdate, value }: OrgUnitSetter) =>
  ({ checked }: { checked: boolean }) => {
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

export const onUserSubX2Units =
  ({ onUpdate, value }: OrgUnitSetter) =>
  ({ checked }: { checked: boolean }) => {
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
