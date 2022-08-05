import type { OrganisationUnit, OrgUnitSelection } from "@hisptz/dhis2-utils";
import { cloneDeep, compact, filter, find, flattenDeep, isEmpty, remove, take, uniq } from "lodash";
import { searchOrgUnitUsingKeyword } from "../services";

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

export const searchOrgUnits = async (dataEngine: any, searchValue: string) => {
  try {
    if (searchValue) {
      return await searchOrgUnitUsingKeyword(dataEngine, searchValue);
    } else {
      return [];
    }
  } catch (e) {
    console.error(e);
  }
};

export const sanitizeFilters = (filters: Array<OrganisationUnit>): Array<string> => {
  const sanitizedFilters = filters.map(({ path }) => {
    const newFilter = [];
    const splitFilter = filter(path?.split("/"), (path) => path !== "");
    const count = splitFilter.length;
    if (count === 1) {
      return path;
    }
    for (let i = 0; i <= count; i++) {
      newFilter.push(`/${take(splitFilter, i).join("/")}`);
    }

    return remove(newFilter, (filter) => filter !== "/");
  });
  return uniq(flattenDeep(compact(sanitizedFilters)));
};
