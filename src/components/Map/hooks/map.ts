import { getBounds, getCenter } from "geolib";
import { LatLngTuple } from "leaflet";
import { flattenDeep, forEach, head } from "lodash";
import { useMemo } from "react";
import { useMapOrganisationUnit } from "../components/MapProvider/hooks";

function getCoordinatesFromBounds(bound: any[]): any[] {
  const bounds: number[][] = [];

  function getBounds(bound: any[]) {
    if (typeof head(bound) === "number") {
      bounds.push(bound as number[]);
    }
    forEach(bound, (internalBound) => getBounds(internalBound));
  }

  getBounds(bound);

  return bounds;
}

export function useMapBounds() {
  const { orgUnits } = useMapOrganisationUnit();

  const boundPoints = useMemo(
    () =>
      flattenDeep(
        orgUnits?.map((area: { bounds: any }) =>
          getCoordinatesFromBounds(area.bounds).map((coordinate: number[]) => ({
            lat: coordinate[1],
            lng: coordinate[0],
          }))
        )
      ) ?? [],
    [orgUnits]
  );

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
