import { colors } from "@dhis2/ui";
import type { OrganisationUnit, OrgUnitSelection } from "@hisptz/dhis2-utils";
import { LeafletMouseEvent } from "leaflet";
import { filter, find, flatten, forEach, head } from "lodash";
import { defaultLegendSet } from "../constants/legendSet";

export function convertCoordinates([lng, lat]: [number, number]): { lat: number; lng: number } {
  return {
    lat: lat,
    lng: lng,
  };
}

export function getOrgUnitBoundaries(points: Array<any>, depth: number): Array<{ lat: number; lng: number }> {
  if (typeof head(points) === "number" || typeof head(points) === "string") {
    return [convertCoordinates(points as [number, number])];
  }
  return flatten(points.map(getOrgUnitBoundaries));
}

export function highlightFeature(e: LeafletMouseEvent, style: any) {
  const layer = e.target;
  layer.setStyle(style);
  // layer.bringToFront();
}

export function resetHighlight(e: LeafletMouseEvent, defaultStyle: any) {
  const layer = e.target;
  layer.setStyle(defaultStyle);
  // layer.bringToBack();
}

export function getColorFromLegendSet(legendSet: any, value: number): string {
  const legends = legendSet?.legends ?? defaultLegendSet.legends;
  const legend = find(legends ?? [], (legend: any) => legend?.startValue <= value && legend?.endValue >= value) ?? {};
  return legend.color ? legend.color : colors.grey900;
}

export function getLegendCount(legend: any, data: any) {
  const { startValue, endValue } = legend;
  return filter(data, (d: any) => d.data >= startValue && d.data <= endValue).length;
}

export function getOrgUnitsSelection(orgUnitSelection: OrgUnitSelection) {
  const orgUnits = [];
  if (orgUnitSelection.userOrgUnit) {
    orgUnits.push("USER_ORGUNIT");
  }

  if (orgUnitSelection.userSubUnit) {
    orgUnits.push("USER_ORGUNIT_CHILDREN");
  }

  if (orgUnitSelection.userSubX2Unit) {
    orgUnits.push("USER_ORGUNIT_GRANDCHILDREN");
  }

  return [...orgUnits, ...(orgUnitSelection?.orgUnits?.map((ou: OrganisationUnit) => `${ou.id}`) ?? [])];
}

export function sanitizeOrgUnits(metaData: any) {
  if (metaData) {
    return metaData?.dimensions?.ou?.map((ouId: string) => ({
      id: ouId,
      name: metaData?.items[ouId]?.name,
      path: metaData?.ouHierarchy?.[ouId],
    }));
  }
  return [];
}

export function getCoordinatesFromBounds(bound: any[]): any[] {
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
