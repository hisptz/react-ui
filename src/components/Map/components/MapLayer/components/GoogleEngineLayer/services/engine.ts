import { MapOrgUnit } from "../../../../../interfaces";
import ee from "@google/earthengine";
import { EarthEngineOptions, EarthEngineToken, RefreshToken } from "../interfaces";

// @ts-ignore
window.ee = ee;

export class EarthEngine {
  token?: EarthEngineToken;
  options: EarthEngineOptions;
  refresh?: RefreshToken;
  orgUnits?: MapOrgUnit[];
  initialized = false;

  constructor({ options }: { token: EarthEngineToken; options: EarthEngineOptions; refresh: RefreshToken }) {
    this.options = options;
  }

  updateToken(token: EarthEngineToken, refresh: RefreshToken) {
    this.token = token;
    this.refresh = refresh;
  }

  async init(token: EarthEngineToken, refresh: RefreshToken): Promise<EarthEngine> {
    this.updateToken(token, refresh);
    await this.setToken();
    this.initialized = true;
    return this;
  }

  setOrgUnits(orgUnits: MapOrgUnit[]): EarthEngine {
    this.orgUnits = orgUnits;
    return this;
  }

  protected refreshToken(authArgs: { scope: any }, callback: (props: any) => void) {
    const { tokenType } = this.options;
    if (this.refresh) {
      this.refresh().then((token: EarthEngineToken) => {
        callback({
          ...token,
          token_type: tokenType ?? "Bearer",
          state: authArgs?.scope,
        });
      });
    } else {
      throw "Refresh function not set";
    }
  }

  protected async setToken(): Promise<void> {
    const { tokenType } = this.options;
    const token = this.token;
    console.log();
    await new Promise((resolve, reject) => {
      if (token) {
        const { access_token, client_id, expires_in } = token;
        ee.data.setAuthToken(
          client_id,
          tokenType ?? "Bearer",
          access_token,
          expires_in,
          null,
          () => {
            ee.initialize(null, null, resolve, reject);
          },
          false
        );
        ee.data.setAuthTokenRefresher(this.refreshToken);
      }
      resolve("Token not found");
    });
  }

  protected getGeometryByType(geoJSON: any) {
    const geometryType = geoJSON.properties.type;
    const coordinates = geoJSON.geometry.coordinates;
    switch (geometryType) {
      case "MultiPolygon":
        return ee.Geometry.MultiPolygon(coordinates);
      case "Polygon":
        return ee.Geometry.Polygon(coordinates);
      default:
        return ee.Geometry.Point(coordinates);
    }
  }

  protected getFeatureByType(geoJSON: any) {
    const featureType = geoJSON.type;
    const features = geoJSON.features ?? [];
    const geometry = this.getGeometryByType(geoJSON);

    switch (featureType) {
      case "Feature":
        return ee.Feature(geometry);
      case "FeatureCollection":
        return ee.FeatureCollection([...features.map((feature: any) => ee.Feature(this.getGeometryByType(feature)))]);
    }
  }

  protected getFeatureCollection() {
    if (this.orgUnits) {
      return ee.FeatureCollection(this.orgUnits.map((orgUnit: MapOrgUnit) => this.getFeatureByType(orgUnit.geoJSON)));
    } else {
      throw "You need to set org units first";
    }
  }

  protected visualize(image: any): string {
    const { min, max, palette } = this.options.params;
    console.log(this.options.params);
    return image.visualize(null, null, null, min, max, null, null, palette, false).getMap()?.urlFormat;
  }

  protected async getImage(): Promise<string> {
    const { datasetId, filters } = this.options;
    let image;
    if (filters) {
      //Image collection
      const imageCollection = ee.ImageCollection(datasetId);
      // applyFilter(imageCollection);
      image = imageCollection.mean();
    } else {
      image = ee.Image(datasetId);
    }
    return this.visualize(image.clipToCollection(this.getFeatureCollection()));
  }

  async url(): Promise<string> {
    if (!this.initialized) throw "You need to call init() first";
    return this.getImage();
  }
}
