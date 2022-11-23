import { MapOrgUnit } from "../../../../../interfaces";
// @ts-ignore
import EE from "./api";
// import EE from "@google/earthengine";
import { EarthEngineOptions, EarthEngineToken, RefreshToken } from "../interfaces";
import { combineReducers, getFeatureCollectionProperties, getHistogramStatistics, getInfo, getScale, hasClasses } from "../utils";
import { find, head, isEmpty } from "lodash";

// @ts-ignore
const ee = EE as any;
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
  aggregationData: any;

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

  protected applyBand(imageCollection: any) {
    if (this.options.selectedBands) {
      return imageCollection.select(this.options.selectedBands);
    } else {
      return imageCollection;
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

  async getPeriod() {
    const { type } = this.options;
    if (type !== "ImageCollection") {
      return;
    }

    const imageCollection = this.instance.distinct("system:time_start").sort("system:time_start", false);
    const featureCollection = ee.FeatureCollection(imageCollection).select(["system:time_start", "system:time_end"], null, false);

    return getInfo(featureCollection);
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
    return ee.Geometry(geoJSON?.geometry);
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

  async getScale() {
    try {
      const { type } = this.options;
      switch (type) {
        case "ImageCollection":
          this.scale = await getScale(this.instance.first());
          break;
        default:
          this.scale = await getScale(this.getImage());
      }
    } catch (e) {}
  }

  protected getImageCollectionInstance() {
    const { datasetId } = this.options;
    let imageCollection = ee.ImageCollection(datasetId);
    if (this.period) {
      imageCollection = this.applyPeriod(imageCollection);
    }
    imageCollection = this.applyBand(imageCollection);
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

  async getHistogramAggregations() {
    try {
      const aggregation = head(this.options.aggregations) ?? "";
      const reducer = ee.Reducer.frequencyHistogram();
      const collection = this.getFeatureCollection();
      const legend = this.options.legend?.items;
      const scale = this.scale;
      const tileScale = this.options.tileScale ?? DEFAULT_TILE_SCALE;
      const scaleValue = await getInfo(scale);

      const image = this.getImage();
      const features = Object.values(
        await getInfo(
          image
            .reduceRegions({
              collection,
              reducer,
              scale,
              tileScale,
            })
            .select(["histogram"], null, false)
        ).then((data) =>
          getHistogramStatistics({
            data,
            scale: scaleValue,
            aggregationType: aggregation,
            legend,
          })
        )
      );

      return features.map((feature: any, index: number) => {
        return {
          orgUnit: this.orgUnits?.[index],
          data: feature,
        };
      });
    } catch (e: any) {
      throw Error("Could not get histogram", {
        cause: e,
      });
    }
  }

  async getAggregations() {
    await this.getScale();
    const { type } = this.options;
    if (type === "FeatureCollection") {
      this.aggregationData = await this.getFeatureCollectionAggregation();
      return;
    }
    const aggregations = this.options.aggregations;
    if (!aggregations) return;

    if (hasClasses(head(aggregations) ?? "")) {
      this.aggregationData = await this.getHistogramAggregations();
      return;
    }

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
      this.aggregationData = features.map((feature: any, index: number) => {
        return {
          orgUnit: this.orgUnits?.[index],
          data: feature,
        };
      });
    }
  }

  getAggregation(orgUnit: MapOrgUnit) {
    if (isEmpty(this.aggregationData)) {
      return;
    }
    return find(this.aggregationData, (aggregation) => aggregation.orgUnit.id === orgUnit.id);
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
