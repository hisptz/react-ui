import type { OrgUnitSelection } from "@hisptz/dhis2-utils";
import { LatLngBoundsExpression } from "leaflet";

export interface MapProviderProps {
  children: React.ReactNode;
  orgUnitSelection: OrgUnitSelection;
}

export interface MapProps {
  orgUnitSelection: OrgUnitSelection;
}

export interface MapOrgUnit {
  id: string;
  path: string;
  displayName: string;
  bounds: LatLngBoundsExpression;
  children?: MapOrgUnit[];
}
