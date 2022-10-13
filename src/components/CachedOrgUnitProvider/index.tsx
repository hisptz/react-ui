import React from "react";
import CustomOrgUnitProvider from "./components/CustomOrgUnitProvider";
import { useClearOrganisationData, useOrganisationUnitData } from "./hooks";
import { db } from "./services/db";

interface OfflineOrgUnitProviderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  pageSize?: number;
}

function OfflineOrgUnitProvider({ children, fallback, pageSize }: OfflineOrgUnitProviderProps) {
  const { loading } = useOrganisationUnitData(pageSize);

  if (fallback && loading) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export { useOrganisationUnitData, useClearOrganisationData, db, CustomOrgUnitProvider, OfflineOrgUnitProvider };
export type { OfflineOrgUnitProviderProps };
