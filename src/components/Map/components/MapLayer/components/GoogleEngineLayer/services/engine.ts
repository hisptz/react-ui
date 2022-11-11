import { MapOrgUnit } from "../../../../../interfaces";
import ee from "@google/earthengine";
import { EarthEngineOptions, EarthEngineToken, RefreshToken } from "../interfaces";
import { LatLng } from "leaflet";

// @ts-ignore
window.ee = ee;

const FEATURE_STYLE = { color: "FFA500", strokeWidth: 2 };
const DEFAULT_TILE_SCALE = 1;

export class EarthEngine {
  token?: EarthEngineToken;
  options: EarthEngineOptions;
  refresh?: RefreshToken;
  orgUnits?: MapOrgUnit[];
  initialized = false;
  period?: string | string[];
  instance: any;

  constructor({ options }: { options: EarthEngineOptions }) {
    this.options = options;
    this.initialized = true;
    this.getInstance();
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

  protected applyMask(image: any) {
    if (this.options.mask) {
      return image.updateMask(image.gt(0));
    } else {
      return image;
    }
  }

  protected applyBand(image: any) {
    if (this.options.selectedBands) {
      return image.select(this.options.selectedBands);
    } else {
      return image;
    }
  }

  async getValue(location: LatLng) {
    return new Promise((resolve, reject) => {
      const { lat, lng } = location;
      const point = ee.Geometry.Point(lng, lat);
      const reducer = ee.Reducer.mean();
      const image = this.getImage();

      const reducedImage = image.reduceRegion(reducer, point, 1);

      reducedImage.evaluate((data: unknown, error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  async info() {
    return new Promise((resolve) => {
      this.instance.getInfo(resolve);
    });
  }

  static async setToken(token: EarthEngineToken, refresh: RefreshToken): Promise<void> {
    const tokenType = "Bearer";

    function refreshToken(authArgs: { scope: any }, callback: (props: any) => void) {
      refresh().then(({ token }: { token: EarthEngineToken }) => {
        callback({
          ...token,
          token_type: tokenType ?? "Bearer",
          state: authArgs?.scope,
        });
      });
    }

    await new Promise((resolve, reject) => {
      if (ee.data.getAuthToken()) {
        ee.initialize(null, null, resolve, reject);
      }
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
        ee.data.setAuthTokenRefresher(refreshToken);
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

  protected getParamsFromLegend() {
    if (!this.options.legend) return;
    const legend = this.options.legend.items;
    const keys = legend.map((l) => l.id);
    const min = Math.min(...keys);
    const max = Math.max(...keys);
    const palette = legend.map((l) => l.color).join(",");
    return { min, max, palette };
  }

  protected async visualize(image: any): Promise<string> {
    const { min, max, palette } = this.getParamsFromLegend() ??
      this.options.params ?? {
        min: null,
        max: null,
        palette: null,
      };
    return (
      (await new Promise((resolve, reject) => {
        image.getMap({ min, max, palette }, resolve);
      })) as any
    )?.urlFormat;
  }

  protected getImageCollectionInstance() {
    const { datasetId } = this.options;
    let imageCollection = ee.ImageCollection(datasetId);
    if (this.period) {
      imageCollection = this.applyPeriod(imageCollection);
    }
    return imageCollection;
  }

  protected getImageFromImageCollection() {
    const { mosaic } = this.options;
    const imageCollection = this.instance;
    return mosaic
      ? imageCollection.mosaic().clipToCollection(this.getFeatureCollection())
      : ee.Image(imageCollection.first()).clipToCollection(this.getFeatureCollection());
  }

  protected getImageInstance() {
    const { datasetId } = this.options;
    return ee.Image(datasetId).clipToCollection(this.getFeatureCollection());
  }

  protected getImageFromImage() {
    return this.instance;
  }

  protected getFeatureInstance() {
    const { datasetId } = this.options;
    const feature = ee.Feature(datasetId);
    this.instance = feature;
    return feature;
  }

  protected getImageFromFeature() {
    return this.instance;
  }

  protected getFeatureCollectionInstance() {
    const { datasetId } = this.options;
    let featureCollection = ee.FeatureCollection(datasetId);
    if (this.period) {
      featureCollection = this.applyPeriod(featureCollection);
    }
    return featureCollection;
  }

  protected getImageFromFeatureCollection() {
    let featureCollection = this.instance;
    return featureCollection.draw(FEATURE_STYLE).clipToCollection(this.getFeatureCollection());
  }

  protected getClassifiedImage(image: any) {
    const params = this.options.params;
    if (!params) {
      return {
        image,
        params: this.getParamsFromLegend(),
      };
    }
  }

  protected getInstance() {
    const { type } = this.options;
    switch (type) {
      case "Feature":
        this.instance = this.getFeatureInstance();
        break;
      case "FeatureCollection":
        this.instance = this.getFeatureCollectionInstance();
        break;
      case "Image":
        this.instance = this.getImageInstance();
        break;
      case "ImageCollection":
        this.instance = this.getImageCollectionInstance();
        break;
      default:
        this.instance = this.getImageFromImage();
    }
  }

  protected getImage(): any {
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
    image = this.applyMask(image);
    image = this.applyBand(image);
    return image;
  }

  async url(): Promise<string> {
    if (!this.initialized) throw "You need to call init() first";
    return this.visualize(this.getImage());
  }
}
