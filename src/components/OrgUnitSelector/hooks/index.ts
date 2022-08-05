import { useDataEngine, useDataQuery } from "@dhis2/app-runtime";
import type { OrganisationUnit } from "@hisptz/dhis2-utils";
import { compact, debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import { apiFetchOrganisationUnitRoots, orgUnitLevelAndGroupsQuery } from "../services";
import { sanitizeFilters, searchOrgUnits } from "../utils";

export function useOrgUnitsRoot(): { roots?: Array<any>; loading: boolean; error: any } {
  const engine = useDataEngine();
  const [roots, setRoots] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  useEffect(() => {
    async function getOrgUnits() {
      setLoading(true);
      try {
        setRoots(await apiFetchOrganisationUnitRoots(engine));
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    }

    getOrgUnits();
  }, []);

  return { roots, loading, error };
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
  const [filtering, setFiltering] = useState(false);
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const [filteredOrgUnits, setFilteredOrgUnits] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string[]>(compact((selectedOrgUnits ?? [])?.map(({ path }) => path)));
  const dataEngine = useDataEngine();

  async function getSearch(keyword?: string) {
    if (keyword) {
      setFiltering(true);
      const orgUnits = await searchOrgUnits(dataEngine, keyword);
      const orgUnitsPaths = sanitizeFilters(compact(orgUnits?.map((orgUnit) => orgUnit.path)));
      setFilteredOrgUnits(orgUnitsPaths);
      setExpanded((prevState) => [...prevState, ...orgUnitsPaths]);
      setFiltering(false);
    } else {
      setFilteredOrgUnits([]);
      setExpanded([]);
    }
  }

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
    filteredOrgUnits,
    expanded,
    handleExpand,
    filtering,
  };
}
