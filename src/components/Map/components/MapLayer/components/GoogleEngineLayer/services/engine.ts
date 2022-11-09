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
  period?: string | string[];

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

  setPeriod(period: string) {
    this.period = period;
  }

  protected applyPeriod(imageCollection: any) {
    const period = this.period;
    if (period) {
      return imageCollection.filterDate(period);
    }
  }

  protected async getInfo(imageCollection: any) {
    return await new Promise((resolve, reject) => {});
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

  protected getFeatureCollection(): unknown {
    if (this.orgUnits) {
      return ee.FeatureCollection(this.orgUnits.map((orgUnit: MapOrgUnit) => this.getFeatureByType(orgUnit.geoJSON)));
    } else {
      throw "You need to set org units first";
    }
  }

  protected visualize(image: any): string {
    const { min, max, palette } = this.options.params ?? { min: null, max: null, palette: null };
    return image.visualize(null, null, null, min, max, null, null, palette, false).getMap()?.urlFormat;
  }

  protected getImageFromImageCollection() {
    const { datasetId, mosaic } = this.options;
    let imageCollection = ee.ImageCollection(datasetId);
    if (this.period) {
      imageCollection = this.applyPeriod(imageCollection);
    }
    return mosaic ? imageCollection.mosaic() : imageCollection.mean();
  }

  protected getImageFromImage() {
    const { datasetId } = this.options;
    return ee.Image(datasetId);
  }

  protected getImageFromFeature() {
    return null;
  }

  protected getImageFromFeatureCollection() {
    return null;
  }

  protected async getImage(): Promise<string> {
    const { type } = this.options;
    let image;

    switch (type) {
      case "Feature":
        image = this.getImageFromFeature();
        break;
      case "FeatureCollection":
        image = this.getImageFromFeatureCollection();
        break;
      case "Image":
        image = this.getImageFromImage();
        break;
      case "ImageCollection":
        image = this.getImageFromImageCollection();
        break;
      default:
        image = this.getImageFromImage();
    }
    return this.visualize(image.clipToCollection(this.getFeatureCollection()));
  }

  async url(): Promise<string> {
    if (!this.initialized) throw "You need to call init() first";
    return this.getImage();
  }
}
