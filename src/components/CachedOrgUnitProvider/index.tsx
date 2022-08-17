import React from "react";
import CustomOrgUnitProvider from "./components/CustomOrgUnitProvider";
import { useClearOrganisationData, useOrganisationUnitData } from "./hooks";
import { db } from "./services/db";

interface OfflineOrgUnitProviderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

function OfflineOrgUnitProvider({ children, fallback }: OfflineOrgUnitProviderProps) {
  const { loading } = useOrganisationUnitData();

  if (fallback && loading) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export { useOrganisationUnitData, useClearOrganisationData, db, CustomOrgUnitProvider, OfflineOrgUnitProvider };
export type { OfflineOrgUnitProviderProps };
