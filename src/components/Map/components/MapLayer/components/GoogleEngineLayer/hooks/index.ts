import { useDataQuery } from "@dhis2/app-runtime";
import { find } from "lodash";
import { useMapLayers } from "../../../../MapProvider/hooks";
import { CustomGoogleEngineLayer } from "../../../interfaces";
import { EarthEngineToken } from "../interfaces";

const googleEngineKeyQuery = {
  token: {
    resource: "tokens/google",
  },
};

export function useGoogleEngineToken() {
  const { data, refetch, loading } = useDataQuery(googleEngineKeyQuery, {
    lazy: true,
  });
  const token = data?.token as unknown as EarthEngineToken;
  return {
    token,
    refresh: refetch as unknown as () => Promise<{ token: EarthEngineToken }>,
    loading,
  };
}

export default function useGoogleEngineLayer(layerId: string): CustomGoogleEngineLayer | undefined {
  const { layers } = useMapLayers();
  return find(layers as CustomGoogleEngineLayer[], ["id", layerId]);
}
