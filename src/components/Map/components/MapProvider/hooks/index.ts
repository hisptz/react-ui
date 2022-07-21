import { useContext } from "react";
import { MapOrgUnitContext } from "../../../state";

export function useMapOrganisationUnit() {
  return useContext(MapOrgUnitContext);
}
