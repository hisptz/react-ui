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

export const getScale = (image: any) => image?.select(0)?.projection()?.nominalScale();

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
