import type { OrgUnitSelection } from "@hisptz/dhis2-utils";
import { ThematicLayer } from "../components/MapLayer/interfaces";

export interface MapProviderProps {
  children: React.ReactNode;
  orgUnitSelection: OrgUnitSelection;
  periodSelection?: { periods: any[] };
}

export interface MapProps {
  orgUnitSelection: OrgUnitSelection;
  boundaryLayer?: {
    enabled: boolean;
  };
  thematicLayers?: ThematicLayer[];
  periodSelection?: { periods: any[] };
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
