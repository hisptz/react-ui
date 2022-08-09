import type { OrgUnitSelection } from "@hisptz/dhis2-utils";
import type { MapContainerProps } from "react-leaflet";
import { ThematicLayer } from "../components/MapLayer/interfaces";

export interface MapProviderProps {
  children: React.ReactNode;
  orgUnitSelection: OrgUnitSelection;
  periodSelection?: { periods: any[] };
}

export interface MapProps {
  orgUnitSelection: OrgUnitSelection; //Organisation unit selection
  boundaryLayer?: {
    enabled: boolean;
  };
  thematicLayers?: ThematicLayer[];
  periodSelection?: { periods: any[] };
  mapOptions?: MapContainerProps;
}

export interface MapOrgUnit {
  id: string;
  path: string;
  name: string;
  bounds: any[];
  geoJSON: any;
  children?: MapOrgUnit[];
  level?: number;
}
