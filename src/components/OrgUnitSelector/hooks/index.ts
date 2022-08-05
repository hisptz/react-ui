import { useDataQuery } from "@dhis2/app-runtime";
import type { OrganisationUnit } from "@hisptz/dhis2-utils";
import { compact, debounce, isEmpty } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import { orgUnitLevelAndGroupsQuery, orgUnitRootsQuery, orgUnitSearchQuery } from "../services";
import { sanitizeFilters } from "../utils";

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

export function useFilterOrgUnits(selectedOrgUnits: Array<OrganisationUnit>) {
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const [expanded, setExpanded] = useState<string[]>(compact((selectedOrgUnits ?? [])?.map(({ path }) => path)));
  const { refetch, data, loading } = useDataQuery(orgUnitSearchQuery, {
    variables: {
      keyword: searchValue,
    },
    lazy: true,
  });

  const orgUnitsPaths = useMemo(() => sanitizeFilters((data?.orgUnits as any)?.organisationUnits ?? []), [data]);

  async function getSearch(keyword?: string) {
    if (keyword) {
      await refetch({ keyword });
    }
  }

  useEffect(() => {
    if (!isEmpty(orgUnitsPaths)) {
      const pathsToExpand = (orgUnitsPaths ?? []).map((path) => path.split("/").slice(0, -1).join("/"));
      setExpanded((prevState) => [...prevState, ...pathsToExpand]);
    } else {
      setExpanded(compact([...selectedOrgUnits?.map(({ path }) => path)]));
    }
  }, [orgUnitsPaths]);

  const onSearch = useRef(debounce(async (keyword?: string) => await getSearch(keyword), 500));

  const handleExpand = ({ path }: { path: string }) => {
    setExpanded((prevState) => {
      if (prevState.includes(path)) {
        return prevState.filter((p) => p !== path);
      }
      return [...prevState, path];
    });
  };

  useEffect(() => {
    onSearch.current(searchValue);
  }, [searchValue]);

  return {
    searchValue,
    setSearchValue,
    filteredOrgUnits: orgUnitsPaths,
    expanded,
    handleExpand,
    filtering: loading,
  };
}
