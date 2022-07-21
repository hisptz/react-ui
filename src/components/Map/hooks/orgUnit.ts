import { useDataQuery } from "@dhis2/app-runtime";
import type { OrgUnitSelection } from "@hisptz/dhis2-utils";
import { useCallback } from "react";
import { getOrgUnitsSelection, sanitizeOrgUnits } from "../utils/map";

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
