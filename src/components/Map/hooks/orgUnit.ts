import { useDataQuery } from "@dhis2/app-runtime";
import type { OrganisationUnit, OrgUnitSelection } from "@hisptz/dhis2-utils";
import { useCallback } from "react";

const orgUnitResolverQuery = {
  analytics: {
    resource: "analytics",
    params: ({ orgUnitIds }: any) => ({
      dimension: [`ou:${orgUnitIds.join(";")}`, `pe:${new Date().getFullYear()}`],
      skipData: true,
      hierarchyMeta: true,
    }),
  },
};

export function getOrgUnitsSelection(orgUnitSelection: OrgUnitSelection) {
  const orgUnits = [];
  if (orgUnitSelection.userOrgUnit) {
    orgUnits.push("USER_ORGUNIT");
  }

  if (orgUnitSelection.userSubUnit) {
    orgUnits.push("USER_ORGUNIT_CHILDREN");
  }

  if (orgUnitSelection.userSubX2Unit) {
    orgUnits.push("USER_ORGUNIT_GRANDCHILDREN");
  }

  return [...orgUnits, ...(orgUnitSelection?.orgUnits?.map((ou: OrganisationUnit) => `${ou.id}`) ?? [])];
}

export function sanitizeOrgUnits(metaData: any) {
  if (metaData) {
    return metaData?.dimensions?.ou?.map((ouId: string) => ({
      id: ouId,
      name: metaData?.items[ouId]?.name,
      path: metaData?.ouHierarchy?.[ouId],
    }));
  }
  return [];
}

export function useOrganisationUnitResolver(orgUnitSelection: OrgUnitSelection) {
  const orgUnitIds = getOrgUnitsSelection(orgUnitSelection);
  const { refetch } = useDataQuery(orgUnitResolverQuery, { variables: { orgUnitIds }, lazy: true });

  const get = useCallback(async () => {
    const response = await refetch({ orgUnitIds });
    const { metaData } = (response?.analytics as any) ?? [];
    return [...sanitizeOrgUnits(metaData as any), ...(orgUnitSelection.orgUnits ?? [])];
  }, [refetch]);

  return {
    get,
  };
}
