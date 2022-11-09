import { MapOrgUnit } from "../../../../../../../interfaces";
import { EarthEngineOptions, EarthEngineToken } from "../index";
import EE from "@google/earthengine";

const ee = (window.ee = import("@google/earthengine"));

const getZIndex = (index: number) => 200 + index * 10;

export async function getEngineImageUrl({
  options,
  orgUnit,
  refresh,
  token,
}: {
  options: EarthEngineOptions;
  orgUnit: MapOrgUnit;
  token: EarthEngineToken;
  refresh: () => Promise<EarthEngineToken>;
}) {
  const { id, tokenType, name } = options ?? {};
  const filterValues = {
    id,
    name,
    year: 2020,
  };

  async function setToken() {
    return await new Promise((resolve, reject) => {
      console.log(token);
      if (token) {
        const { access_token, client_id, expires_in } = token;
        EE.data.setAuthToken(
          client_id,
          tokenType ?? "Bearer",
          access_token,
          expires_in,
          null,
          () => {
            EE.initialize(null, null, resolve, reject);
          },
          false
        );

        EE.data.setAuthTokenRefresher(refreshToken);
      }
      resolve("Token not found");
    });
  }

  function getGeometryByType(geoJSON: any) {
    const geometryType = geoJSON.properties.type;
    const coordinates = geoJSON.geometry.coordinates;
    switch (geometryType) {
      case "MultiPolygon":
        return EE.Geometry.MultiPolygon(coordinates);
      case "Polygon":
        return EE.Geometry.Polygon(coordinates);
      default:
        return EE.Geometry.Point(coordinates);
    }
  }

  function getFeatureByType(geoJSON: any) {
    const featureType = geoJSON.type;
    const features = geoJSON.features ?? [];
    const geometry = getGeometryByType(geoJSON);

    switch (featureType) {
      case "Feature":
        return EE.Feature(geometry);
      case "FeatureCollection":
        return EE.FeatureCollection([...features.map((feature: any) => EE.Feature(getGeometryByType(feature)))]);
    }
  }

  function getFeature() {
    return getFeatureByType(orgUnit.geoJSON);
  }

  function refreshToken(authArgs: { scope: any }, callback: (props: any) => void) {
    refresh().then((token) => {
      callback({
        ...token,
        token_type: tokenType,
        state: authArgs?.scope,
      });
    });
  }

  function applyFilter(collection: any) {
    if (options.filters) {
      const filters = options.filters(filterValues);
      filters.forEach((filter) => {
        collection.filter(EE.Filter[filter.type].apply(filter.arguments));
      });
    }
  }

  async function getImage() {
    try {
      await setToken();
      console.log("Token set");
      let image;
      if (options.filters) {
        //Image collection
        const imageCollection = EE.ImageCollection(options.datasetId);
        // applyFilter(imageCollection);
        image = imageCollection.mean();
      } else {
        image = EE.Image(options.datasetId);
      }
      console.log(getGeometryByType(orgUnit.geoJSON));
      return getTileUrl(image.clip(getGeometryByType(orgUnit.geoJSON)));
    } catch (e) {
      console.error(e);
    }
  }

  function getTileUrl(image: any) {
    const { min, max, palette } = options.params;
    return image.visualize(null, null, null, min, max, null, null, palette, false).getMap()?.urlFormat;
  }

  return await getImage();
}
