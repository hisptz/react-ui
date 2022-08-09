import { compact, isEmpty } from "lodash";

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
    params: ({ keyword, groups }: any) => ({
      fields: ["id,path"],
      filter: compact([
        keyword ? `identifiable:token:${keyword}` : undefined,
        !isEmpty(groups) ? `organisationUnitGroups.id:in:[${groups.join(",")}]` : undefined,
      ]),
    }),
  },
};
