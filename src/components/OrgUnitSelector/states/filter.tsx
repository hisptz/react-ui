import { useDataQuery } from "@dhis2/app-runtime";
import type { OrganisationUnit } from "@hisptz/dhis2-utils";
import { compact, isEmpty } from "lodash";
import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { orgUnitSearchQuery } from "../services";
import { sanitizeExpansionPaths, sanitizeFilters } from "../utils";

export interface FilterStateProps {
  searchValue?: string;
  searchMode?: boolean;
  expanded?: string[];
  filteredOrgUnits?: string[];
  filtering?: boolean;
  handleExpand?: ({ path }: { path: string }) => void;
  onSearch?: (value: string) => void;
}

export const FilterState = createContext<FilterStateProps>({});

export function FilterStateProvider({
  children,
  selectedOrgUnits,
  filterByGroups,
}: {
  children: ReactNode;
  selectedOrgUnits?: Array<OrganisationUnit>;
  filterByGroups?: string[];
}) {
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const [searchMode, setSearchMode] = useState(false);
  const [expanded, setExpanded] = useState<string[]>(compact((selectedOrgUnits ?? [])?.map(({ path }) => path)));
  const { refetch, data, loading } = useDataQuery(orgUnitSearchQuery, {
    variables: {
      groups: filterByGroups,
    },
    lazy: true,
  });

  const orgUnitsPaths = useMemo(() => {
    if (!isEmpty(searchValue) || !isEmpty(filterByGroups)) {
      return sanitizeFilters((data?.orgUnits as any)?.organisationUnits ?? []);
    }
    return [];
  }, [data, filterByGroups, searchValue, searchMode]);

  const getSearch = useCallback(
    async (keyword?: string) => {
      if (!isEmpty(keyword)) {
        setSearchMode(true);
        await refetch({ keyword, groups: filterByGroups });
      } else {
        console.log("Reset");
        setSearchMode(false);
        if (!isEmpty(filterByGroups)) {
          await refetch({ keyword: null, groups: filterByGroups });
        }
      }
    },
    [refetch, filterByGroups]
  );

  useEffect(() => {
    if (!isEmpty(filterByGroups)) {
      refetch({ groups: filterByGroups });
    }
  }, [filterByGroups]);

  useEffect(() => {
    if (!isEmpty(orgUnitsPaths) && !isEmpty(searchValue)) {
      const pathsToExpand = sanitizeExpansionPaths(orgUnitsPaths);
      setExpanded((prevState) => [...prevState, ...pathsToExpand]);
    } else {
      setExpanded([...sanitizeExpansionPaths(compact(selectedOrgUnits?.map(({ path }) => path)) ?? [])]);
    }
  }, [orgUnitsPaths]);

  const onSearch = useCallback(
    async (keyword: string) => {
      setSearchValue(keyword);
      return await getSearch(keyword);
    },
    [getSearch]
  );

  const handleExpand = ({ path }: { path: string }) => {
    setExpanded((prevState) => {
      if (prevState.includes(path)) {
        return prevState.filter((p) => p !== path);
      }
      return [...prevState, path];
    });
  };

  return (
    <FilterState.Provider
      value={{
        searchValue,
        onSearch,
        filteredOrgUnits: orgUnitsPaths,
        expanded,
        handleExpand,
        filtering: loading,
        searchMode,
      }}>
      {children}
    </FilterState.Provider>
  );
}
