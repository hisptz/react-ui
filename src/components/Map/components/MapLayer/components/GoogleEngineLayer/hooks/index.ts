import { useDataEngine } from "@dhis2/app-runtime";
import { find } from "lodash";
import { useMapLayers } from "../../../../MapProvider/hooks";
import { CustomThematicLayer } from "../../../interfaces";

export default function useGoogleEngineLayer(layerId: string) {
  const { layers } = useMapLayers();
  const engine = useDataEngine();
  const layer = find(layers as CustomThematicLayer[], ["id", layerId]);

  return {
    ...layer,
    engine,
  };
}
