import { EarthEngineOptions } from "../interfaces";

export const combineReducers = (ee: any) => (types: string[]) =>
  types.reduce(
    (r: any, t: any, i: any) =>
      i === 0
        ? r[t]()
        : r.combine({
            reducer2: ee.Reducer[t](),
            sharedInputs: true,
          }),
    ee.Reducer
  );

export const getInfo = (instance: any) =>
  new Promise((resolve, reject) =>
    instance.evaluate((data: any, error: Error) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    })
  );

export const getFeatureCollectionProperties = (data: any) =>
  data.features.reduce(
    (obj: any, f: any) => ({
      ...obj,
      [f.id]: f.properties,
    }),
    {}
  );

export const getScale = (image: any) => image?.select(0).projection()?.nominalScale();

const getParamsFromLegend = (legend: any[]) => {
  const keys = legend.map((l) => l.id);
  const min = Math.min(...keys);
  const max = Math.max(...keys);
  const palette = legend.map((l) => l.color).join(",");

  return { min, max, palette };
};

export const getClassifiedImage = (eeImage: any, { legend: legends, params }: EarthEngineOptions) => {
  const legend = legends?.items ?? [];
  if (!params) {
    // Image has classes (e.g. landcover)
    return { eeImage, params: getParamsFromLegend(legend) };
  }

  const min = 0;
  const max = legend.length - 1;
  const { palette } = params;
  let zones;

  for (let i = min, item; i < max; i++) {
    item = legend[i] as any;

    if (!zones) {
      zones = eeImage.gt(item.to);
    } else {
      zones = zones.add(eeImage.gt(item.to));
    }
  }

  return { eeImage: zones, params: { min, max, palette } };
};

const squareMetersToHectares = (value: number) => value / 10000;

const squareMetersToAcres = (value: number) => value / 4046.8564224;

const classAggregation = ["percentage", "hectares", "acres"];

export const hasClasses = (type: string) => classAggregation.includes(type);

export const getHistogramStatistics = ({ data, scale, aggregationType, legend }: { data: any; scale: any; aggregationType: string; legend: any }) =>
  data.features.reduce((obj: Record<any, any>, { id, properties }: { id: string; properties: any }) => {
    const { histogram } = properties;
    const sum: number = Object.values(histogram).reduce((a: any, b: any) => a + b, 0) as number;
    obj[id] = legend.reduce((values: any, { id }: { id: string }) => {
      const count = histogram[id] || 0;
      const sqMeters = count * (scale * scale);
      let value;
      switch (aggregationType) {
        case "hectares":
          value = Math.round(squareMetersToHectares(sqMeters));
          break;
        case "acres":
          value = Math.round(squareMetersToAcres(sqMeters));
          break;
        default:
          value = (count / sum) * 100; // percentage
      }

      values[id] = value;

      return values;
    }, {});
    return obj;
  }, {});
