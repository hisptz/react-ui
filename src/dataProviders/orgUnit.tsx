import { CustomDataProvider } from "@dhis2/app-runtime";
import { filter, find, flattenDeep, isEmpty, last, uniqBy } from "lodash";
import React from "react";
import orgUnits from "../data/orgUnit.json";

export default function OrgUnitDataProvider({ children }: { children: React.ReactNode }) {
  const allOrgUnits = uniqBy(flattenDeep(orgUnits.organisationUnitsWithChildren.map((orgUnit) => [orgUnit, ...orgUnit.children])), "id");
  return (
    <CustomDataProvider
      data={{
        organisationUnits: async (type, query): Promise<any> => {
          if (query.id) {
            return find(
              (query.params?.fields as string[]).includes("children::size") ? orgUnits.organisationUnitsChildrenCount : orgUnits.organisationUnitsWithChildren,
              { id: query.id }
            );
          }
          if (query.params?.filter) {
            const keyword = last((query?.params?.filter as string)?.split(":")) ?? "";
            return {
              organisationUnits: filter(allOrgUnits, (orgUnit) => {
                return !isEmpty(`${orgUnit.id} ${orgUnit.displayName}`.match(RegExp(keyword.toLowerCase())));
              }),
            };
          }

          if (query?.params?.userDataViewFallback) {
            return {
              organisationUnits: orgUnits.rootOrganisationUnits,
            };
          } else {
            return {
              organisationUnits: [orgUnits.organisationUnitsChildrenCount],
            };
          }
        },
        organisationUnitLevels: orgUnits.organisationUnitLevels,
        organisationUnitGroups: orgUnits.organisationUnitGroups,
      }}>
      {children}
    </CustomDataProvider>
  );
}
