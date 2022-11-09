import { useDataQuery } from "@dhis2/app-runtime";
import { find } from "lodash";
import { useMapLayers } from "../../../../MapProvider/hooks";
import { CustomGoogleEngineLayer } from "../../../interfaces";
import { useEffect, useMemo, useState } from "react";
import { EarthEngine } from "../services/engine";
import { useBoundaryData } from "../../BoundaryLayer/hooks/useBoundaryData";
import { EarthEngineToken } from "../interfaces";

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
  const layer = find(layers as CustomGoogleEngineLayer[], ["id", layerId]);

  return {
    ...layer,
  };
}

export function useGoogleEngine({ layerId }: { layerId: string }) {
  const { options, filters } = useGoogleEngineLayer(layerId);
  const { token, refresh, loading } = useGoogleEngineToken();
  const orgUnits = useBoundaryData();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [urlLoading, setUrlLoading] = useState(false);

  const earthEngine = useMemo(() => {
    return new EarthEngine({ token, refresh, options });
  }, [refresh, options]); //Do not add token, it probably changes when refetch is called causing unnecessary reinitialization

  useEffect(() => {
    async function getImageUrl() {
      if (token) {
        if (!earthEngine.initialized) {
          setUrlLoading(true);
          await earthEngine.init(token, refresh);
          earthEngine.setOrgUnits(orgUnits ?? []);

          const period = filters?.period;
          if (period) {
            earthEngine.setPeriod(period);
          }
          setImageUrl(await earthEngine.url());
          setUrlLoading(false);
        }
      }
    }

    getImageUrl();
  }, [token]);

  return {
    imageUrl,
    tokenLoading: loading,
    urlLoading,
    options,
  };
}
