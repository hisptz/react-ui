import type { OrganisationUnit } from "@hisptz/dhis2-utils";

export const orgUnitRootsQuery = {
  orgUnitRoots: {
    resource: "organisationUnits",
    params: {
      fields: "id,displayName,name",
      userDataViewFallback: true,
      paging: false,
    },
  },
};
export const orgUnitLevelsQuery = {
  orgUnitLevels: {
    resource: "organisationUnitLevels",
    params: {
      fields: ["id", "displayName", "level"],
    },
  },
};
export const orgUnitLevelAndGroupsQuery = {
  orgUnitGroups: {
    resource: "organisationUnitGroups",
    params: {
      fields: ["id", "displayName"],
    },
  },
  orgUnitLevels: {
    resource: "organisationUnitLevels",
    params: {
      fields: ["id", "displayName", "level"],
    },
  },
};

export const orgUnitSearchQuery = {
  orgUnits: {
    resource: "organisationUnits",
    params: ({ keyword }: any) => ({
      fields: ["id,path"],
      filter: `identifiable:token:${keyword}`,
    }),
  },
};

export const apiFetchOrganisationUnitRoots = async (dataEngine: any, onError?: (e: any) => void) => {
  const orgUnitRootsData = await dataEngine.query(orgUnitRootsQuery, {
    onError,
  });
  return orgUnitRootsData.orgUnitRoots.organisationUnits;
};

export const apiFetchOrganisationUnitLevels = async (dataEngine: any, onError?: (e: any) => void) => {
  const orgUnitLevelsData = await dataEngine.query(orgUnitLevelsQuery, {
    onError,
  });
  return orgUnitLevelsData.orgUnitLevels.organisationUnitLevels;
};
export const apiFetchOrganisationUnitGroups = async (dataEngine: any, onError?: (e: any) => void) => {
  const orgUnitGroupsData = await dataEngine.query(orgUnitLevelAndGroupsQuery, {
    onError,
  });
  return orgUnitGroupsData.orgUnitGroups.organisationUnitGroups;
};

export const searchOrgUnitUsingKeyword = async (dataEngine: any, keyword: string, onError?: (e: any) => void): Promise<Array<OrganisationUnit>> => {
  const searchedOrgUnits = await dataEngine.query(orgUnitSearchQuery, {
    onError,
    variables: {
      keyword,
    },
  });
  return searchedOrgUnits?.orgUnits?.organisationUnits ?? [];
};
