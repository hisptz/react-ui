import { useContext } from "react";
import { MapLayersContext, MapOrgUnitContext, MapPeriodContext } from "../../../state";

export function useMapOrganisationUnit() {
  return useContext(MapOrgUnitContext);
}

export function useMapPeriods() {
  return useContext(MapPeriodContext);
}

export function useMapLayers() {
  return useContext(MapLayersContext);
}
