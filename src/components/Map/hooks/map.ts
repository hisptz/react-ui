import { getBounds, getCenter } from "geolib";
import { LatLngTuple } from "leaflet";
import { flattenDeep } from "lodash";
import { useMemo } from "react";
import { useMapOrganisationUnit } from "../components/MapProvider/hooks";
import { convertCoordinates } from "../utils/map";

export function useMapBounds() {
  const { orgUnits } = useMapOrganisationUnit();

  const boundPoints = useMemo(() => flattenDeep(orgUnits?.map((area: any) => area.coordinates?.map(convertCoordinates))) ?? [], [orgUnits]);

  const center = useMemo(() => {
    const center = getCenter(boundPoints) ?? {};
    if (center) {
      return { lat: center.latitude, lng: center.longitude };
    }
  }, [orgUnits]);
  const bounds: Array<LatLngTuple> = useMemo(() => {
    const { minLat, maxLat, minLng, maxLng } = getBounds(boundPoints);
    return [
      [minLat, minLng],
      [maxLat, maxLng],
    ];
  }, [orgUnits]);

  return {
    center,
    bounds,
  };
}
