import { type LayerOptions } from "leaflet";
import { MapOrgUnit } from "../../../../../../interfaces";
import { getEngineImageUrl } from "./services/engine";
import { TileLayer } from "react-leaflet";
import React, { useEffect, useState } from "react";

export interface EarthEngineToken {
  access_token: string;
  client_id: string;
  expires_in: number;
}

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

export interface GoogleEngineComponentProps extends LayerOptions {
  options: EarthEngineOptions;
  orgUnit: MapOrgUnit;
  token: EarthEngineToken;
  refresh: () => Promise<EarthEngineToken>;
}

export function GoogleEngineComponent(props: GoogleEngineComponentProps) {
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    async function getImageUrl() {
      setImageUrl(await getEngineImageUrl(props));
    }

    getImageUrl();
  }, [props]);

  if (!imageUrl) {
    return null;
  }

  return <TileLayer id={props.options.id} url={imageUrl} />;
}
