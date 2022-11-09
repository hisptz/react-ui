import { MapOrgUnit } from "../../../../../interfaces";

export interface EarthEngineToken {
  access_token: string;
  client_id: string;
  expires_in: number;
}

export type RefreshToken = () => Promise<EarthEngineToken>;

export interface EarthEngineOptions {
  layer: "earthEngine";
  id: string;
  url: string;
  datasetId: string;
  name: string;
  unit: string;
  description: string;
  source: string;
  sourceUrl: string;
  img: string;
  defaultAggregations: string[];
  periodType: string;
  filters?: (args: { id: string; name: string; year: number }) => { id: string; name: string; type: string; arguments: any[] }[];
  legend: any;
  mosaic?: boolean;
  params: {
    min: number;
    max: number;
    palette: string;
  };
  opacity: number;
  tokenType: "Bearer";
  aggregation: string[];
  popup: string;
  engine: any;
}

export interface GoogleEngineComponentProps {
  options: EarthEngineOptions;
  orgUnits: MapOrgUnit[];
}
