import { find } from "lodash";
import { useMapLayers } from "../../../../MapProvider/hooks";
import { CustomPointLayer } from "../../../interfaces";

export function usePointLayer() {
  const { layers } = useMapLayers();
  return find(layers, ["type", "point"]) as CustomPointLayer;
}
