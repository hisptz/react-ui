import { useDataQuery } from "@dhis2/app-runtime";
import { useContext } from "react";
import { orgUnitLevelAndGroupsQuery, orgUnitRootsQuery } from "../services";
import { FilterState } from "../states/filter";

export function useOrgUnitsRoot(): { roots?: Array<any>; loading: boolean; error: any } {
  const { loading, error, data } = useDataQuery(orgUnitRootsQuery);

  return { roots: (data?.orgUnitRoots as any)?.organisationUnits, loading, error };
}

export function useOrgUnitLevelsAndGroups(): { levels: Array<any>; groups: Array<any>; loading: boolean; error: any } {
  const { loading, error, data } = useDataQuery(orgUnitLevelAndGroupsQuery);

  return {
    levels: (data?.orgUnitLevels as any)?.organisationUnitLevels,
    groups: (data?.orgUnitGroups as any)?.organisationUnitGroups,
    error,
    loading,
  };
}

export function useFilterOrgUnits() {
  return useContext(FilterState);
}
