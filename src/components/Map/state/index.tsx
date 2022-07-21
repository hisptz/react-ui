import type { OrgUnitSelection } from "@hisptz/dhis2-utils";
import { createContext } from "react";
import { MapOrgUnit } from "../interfaces";

export const MapOrgUnitContext = createContext<{
  orgUnitSelection: OrgUnitSelection;
  orgUnits?: MapOrgUnit[];
}>({
  orgUnitSelection: { orgUnits: [] },
  orgUnits: [],
});
