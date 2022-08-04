import { colors } from "@dhis2/ui";
import type { OrganisationUnit, OrgUnitSelection } from "@hisptz/dhis2-utils";
import { LeafletMouseEvent } from "leaflet";
import { compact, filter, find, isString, sortBy } from "lodash";
import { defaultLegendSet } from "../constants/legendSet";

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

export function getColorFromLegendSet(legendSet: any, value?: number): string {
  if (!value) {
    return "";
  }
  const legends = legendSet?.legends ?? defaultLegendSet.legends;
  const legend = find(legends ?? [], (legend: any) => legend?.startValue <= value && legend?.endValue >= value) ?? {};
  return legend.color ? legend.color : colors.grey100;
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

export function toGeoJson(organisationUnits: any) {
  return sortBy(organisationUnits, "le").map((ou: any) => {
    try {
      const coord = JSON.parse(ou.co);
      let gpid = "";
      let gppg = "";
      let type = "Point";

      if (ou.ty === 2) {
        type = "Polygon";
        if (ou.co.substring(0, 4) === "[[[[") {
          type = "MultiPolygon";
        }
      }

      // Grand parent
      if (isString(ou.pg) && ou.pg.length) {
        const ids = compact(ou.pg.split("/"));

        // Grand parent id
        if (ids.length >= 2) {
          gpid = ids[ids.length - 2] as string;
        }

        // Grand parent parent graph
        if (ids.length > 2) {
          gppg = "/" + ids.slice(0, ids.length - 2).join("/");
        }
      }

      return {
        type: "Feature",
        id: ou.id,
        geometry: {
          type,
          coordinates: coord,
        },
        properties: {
          type,
          id: ou.id,
          name: ou.na,
          hasCoordinatesDown: ou.hcd,
          hasCoordinatesUp: ou.hcu,
          level: ou.le,
          grandParentParentGraph: gppg,
          grandParentId: gpid,
          parentGraph: ou.pg,
          parentId: ou.pi,
          parentName: ou.pn,
          dimensions: ou.dimensions,
        },
      };
    } catch (e) {
      console.log(ou);
      console.log(e);
      return {};
    }
  });
}
