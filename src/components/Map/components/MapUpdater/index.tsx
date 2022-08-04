import type { LatLngTuple } from "leaflet";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function MapUpdater({ bounds }: { bounds: LatLngTuple[] }) {
  const map = useMap();

  useEffect(() => {
    if (!isEmpty(bounds)) {
      map.fitBounds(bounds);
    }
  }, [bounds]);
  return null;
}
