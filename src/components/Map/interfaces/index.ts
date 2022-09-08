import type { OrgUnitSelection } from "@hisptz/dhis2-utils";
import type { MapContainerProps } from "react-leaflet";
import { MapControls } from "../components/MapArea/interfaces";
import { CustomBoundaryLayer, CustomThematicPrimitiveLayer } from "../components/MapLayer/interfaces";

export interface MapProviderProps {
  children: React.ReactNode;
  orgUnitSelection: OrgUnitSelection;
  layers?: Array<CustomBoundaryLayer | CustomThematicPrimitiveLayer>;
  periodSelection?: { periods: any[] };
}

export interface MapProps {
  key?: string;
  orgUnitSelection: OrgUnitSelection; //Organisation unit selection
  boundaryLayer?: {
    enabled: boolean;
  };
  controls?: MapControls[];
  thematicLayers?: CustomThematicPrimitiveLayer[];
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
