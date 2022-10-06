import type { OrgUnitSelection } from "@hisptz/dhis2-utils";
import React from "react";
import type { MapContainerProps } from "react-leaflet";
import { MapControls, MapLegendConfig } from "../components/MapArea/interfaces";
import { CustomThematicPrimitiveLayer } from "../components/MapLayer/interfaces";

export interface MapProviderProps {
  children: React.ReactNode;
  orgUnitSelection: OrgUnitSelection;
  periodSelection?: { periods?: string[]; range?: { start: Date; end: Date } };
}

export interface MapProps {
  key?: string;
  orgUnitSelection: OrgUnitSelection; //Organisation unit selection
  pointLayer?: {
    enabled: boolean;
    label?: string;
    level?: number | string;
    group?: string;
    style?: {
      icon?: string;
      groupSet?: string;
    };
  };
  boundaryLayer?: {
    enabled: boolean;
  };
  controls?: MapControls[];
  legends?: MapLegendConfig;
  thematicLayers?: CustomThematicPrimitiveLayer[];
  periodSelection?: { periods?: string[]; range?: { start: Date; end: Date } };
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

export interface PointOrgUnit {
  id: string;
  path: string;
  name: string;
  bounds: any[];
  geoJSON: any;
  icon: {
    type: "custom" | "groupIcon";
    icon: string;
  };
}
