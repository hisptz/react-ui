import { MapOrgUnit } from "../../../../../interfaces";
import ee from "@google/earthengine";
import { EarthEngineOptions, EarthEngineToken, RefreshToken } from "../interfaces";
import { combineReducers, getFeatureCollectionProperties, getInfo, getScale } from "../utils";
import { find, isEmpty } from "lodash";
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
  scale?: any;
  image: any;
  aggregations: any;

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

  protected getReducerByType(type: string) {
    return ee.Reducer[type].call();
  }

  async getValue(geoJSON: any, type: string) {
    return new Promise((resolve, reject) => {
      const point = this.getGeometryByType(geoJSON);
      const reducer = this.getReducerByType(type);
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
    if (imageCollection.first()) {
      this.scale = getScale(imageCollection.first());
    }
    return mosaic
      ? imageCollection.mosaic().clipToCollection(this.getFeatureCollection())
      : ee.Image(imageCollection.first()).clipToCollection(this.getFeatureCollection());
  }

  protected getImageInstance() {
    const { datasetId } = this.options;
    return ee.Image(datasetId).clipToCollection(this.getFeatureCollection());
  }

  protected getImageFromImage() {
    this.scale = getScale(this.instance);

    return this.instance;
  }

  protected getFeatureInstance() {
    const { datasetId } = this.options;
    const feature = ee.Feature(datasetId);
    this.instance = feature;
    return feature;
  }

  protected getImageFromFeature() {
    this.scale = getScale(this.instance);
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

  async getFeatureCollectionAggregation() {
    const { datasetId } = this.options;
    const dataset = ee.FeatureCollection(datasetId);
    const collection = this.getFeatureCollection() as any;
    const aggFeatures = collection
      ?.map((feature: any) => {
        feature = ee.Feature(feature);
        const count = dataset.filterBounds(feature.geometry()).size();

        return feature.set("count", count);
      })
      .select(["count"], null, false);

    return getInfo(aggFeatures).then(getFeatureCollectionProperties);
  }

  async getAggregations() {
    const { type } = this.options;
    if (type === "FeatureCollection") {
      this.aggregations = await this.getFeatureCollectionAggregation();
    }
    const aggregations = this.options.aggregations;
    if (!aggregations) return;
    const reducer = combineReducers(ee)(aggregations);
    const collection = this.getFeatureCollection();
    const image = this.getImage();
    const scale = this.scale;
    const tileScale = this.options.tileScale ?? DEFAULT_TILE_SCALE;
    const aggregatedFeatures = image
      .reduceRegions({
        collection,
        reducer,
        scale,
        tileScale,
      })
      .select(aggregations, null, false);

    const features = Object.values(getFeatureCollectionProperties(await getInfo(aggregatedFeatures))) as any[];
    if (!isEmpty(features) && features.length === this.orgUnits?.length) {
      //Mapping features to orgUnits using index.
      this.aggregations = features.map((feature: any, index: number) => {
        return {
          orgUnit: this.orgUnits?.[index],
          data: feature,
        };
      });
    }
  }

  getAggregation(orgUnit: MapOrgUnit) {
    if (isEmpty(this.aggregations)) {
      return;
    }
    return find(this.aggregations, (aggregation) => aggregation.orgUnit.id === orgUnit.id);
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
    if (this.image) {
      return this.image;
    }
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
    this.image = image;
    return image;
  }

  async url(): Promise<string> {
    if (!this.initialized) throw "You need to call init() first";
    return this.visualize(this.getImage());
  }
}
