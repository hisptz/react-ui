import { CustomDataProvider } from "@dhis2/app-runtime";
import { find } from "lodash";
import React from "react";
import orgUnits from "../data/orgUnit.json";

export default function OrgUnitDataProvider({ children }: { children: React.ReactNode }) {
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
      }}>
      {children}
    </CustomDataProvider>
  );
}
