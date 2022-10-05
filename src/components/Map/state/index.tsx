import type { OrgUnitSelection } from "@hisptz/dhis2-utils";
import { PeriodInterface } from "@iapps/period-utilities";
import { createContext } from "react";
import { CustomMapLayer } from "../components/MapLayer/interfaces";
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
      periods?: PeriodInterface[];
      range?: { start: Date; end: Date };
    }
  | undefined
>({
  periods: [],
});

export const MapLayersContext = createContext<{
  layers: CustomMapLayer[];
  updateLayer: (id: string, updatedLayer: CustomMapLayer) => void;
}>({
  layers: [],
  updateLayer: () => {},
});
