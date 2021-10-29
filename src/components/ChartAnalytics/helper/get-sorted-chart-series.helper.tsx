import { find, map, reverse, sortBy } from "lodash";
import { getCombinedChartSeriesData } from "./get-combined-chart-series-data.helper";

export function getSortedChartSeries(series:any, sortOrder:any) {
  let newSeries = [...series];
  let seriesCategories:any[] = [];

  /**
   * Combine all available series for sorting
   */
  const combinedSeriesData = [
    ...getCombinedChartSeriesData(
      map(series, (seriesObject) => seriesObject.data)
    ),
  ];

  if (sortOrder === 1) {
    seriesCategories = map(
      reverse(sortBy(combinedSeriesData, ["y"])),
      (seriesData) => seriesData.id
    );
    newSeries = map(newSeries, (seriesObject) => {
      const newSeriesObject = { ...seriesObject };

      if (seriesCategories.length > 0) {
        newSeriesObject.data = [
          ...map(seriesCategories, (seriesCategory) =>
            find(seriesObject.data, ["id", seriesCategory])
          ),
        ];
      }

      return newSeriesObject;
    });
  } else if (sortOrder === -1) {
    seriesCategories = map(
      sortBy(combinedSeriesData, ["y"]),
      (seriesData) => seriesData.id
    );
    newSeries = map(series, (seriesObject) => {
      const newSeriesObject = { ...seriesObject };

      if (seriesCategories.length > 0) {
        newSeriesObject.data = [
          ...map(seriesCategories, (seriesCategory) =>
            find(seriesObject.data, ["id", seriesCategory])
          ),
        ];
      }
      return newSeriesObject;
    });
  }
  return newSeries;
}
