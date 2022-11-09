import { useDataEngine, useDataQuery } from "@dhis2/app-runtime";
import { find } from "lodash";
import { useMapLayers } from "../../../../MapProvider/hooks";
import { CustomGoogleEngineLayer } from "../../../interfaces";
import { EarthEngineToken } from "../components/GoogleEngineComponent";

const googleEngineKeyQuery = {
  token: {
    resource: "tokens/google",
  },
};

export function useGoogleEngineToken() {
  const { data, refetch, loading } = useDataQuery(googleEngineKeyQuery);
  const token = data?.token as unknown as EarthEngineToken;
  return {
    token,
    refresh: refetch as unknown as () => Promise<EarthEngineToken>,
    loading,
  };
}

export default function useGoogleEngineLayer(layerId: string) {
  const { layers } = useMapLayers();
  const engine = useDataEngine();
  const layer = find(layers as CustomGoogleEngineLayer[], ["id", layerId]);

  return {
    ...layer,
    engine,
  };
}
