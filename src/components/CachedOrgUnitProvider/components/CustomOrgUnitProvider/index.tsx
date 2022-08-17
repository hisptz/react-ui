import { CustomDataProvider, useDataEngine } from "@dhis2/app-runtime";
import React from "react";
import { db } from "../../services/db";
import { getData, getOrgUnits } from "./services";

export default function OfflineOrganisationUnitProvider({ children }: { children: React.ReactNode }) {
  const engine = useDataEngine();

  if (!db) {
    throw new Error("Database not instantiated. Make sure this component is wrapped in an <CachedOrgUnitProvider /> component");
  }

  return (
    <CustomDataProvider
      data={{
        organisationUnits: (type, query, options) => {
          return getOrgUnits(db.organisationUnits, query, { engine }) as any;
        },
        organisationUnitGroups: (type, query, options) => {
          return getData(db.organisationUnitGroups, query, { engine }) as any;
        },
        organisationUnitLevels: (type, query, options) => {
          return getData(db.organisationUnitLevels, query, { engine }) as any;
        },
      }}>
      {children}
    </CustomDataProvider>
  );
}
