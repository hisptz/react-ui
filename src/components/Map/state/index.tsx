import type { OrgUnitSelection } from "@hisptz/dhis2-utils";
import { createContext } from "react";
import { MapLayer } from "../components/MapLayer/interfaces";
import { MapOrgUnit } from "../interfaces";

export const MapOrgUnitContext = createContext<{
  orgUnitSelection: OrgUnitSelection;
  orgUnits?: MapOrgUnit[];
}>({
  orgUnitSelection: { orgUnits: [] },
  orgUnits: [],
});

export const MapPeriodContext = createContext<
  | {
      periods: any[];
    }
  | undefined
>({
  periods: [],
});

export const MapLayersContext = createContext<{
  layers: MapLayer[];
}>({
  layers: [],
});
