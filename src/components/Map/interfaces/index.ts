import type { OrgUnitSelection } from "@hisptz/dhis2-utils";

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
  name: string;
  bounds: any[];
  coordinates: number[][];
  children?: MapOrgUnit[];
  level?: number;
}
