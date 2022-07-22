import { useContext } from "react";
import { MapOrgUnitContext, MapPeriodContext } from "../../../state";

export function useMapOrganisationUnit() {
  return useContext(MapOrgUnitContext);
}

export function useMapPeriods() {
  return useContext(MapPeriodContext);
}
