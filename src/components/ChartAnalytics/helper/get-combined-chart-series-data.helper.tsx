import { find, findIndex } from "lodash";

export function getCombinedChartSeriesData(seriesData:any) {
  let combinedSeriesData:any[] = [];
  seriesData.forEach((seriesDataArray:any) => {
    seriesDataArray.forEach((seriesDataObject:any) => {
      const availableSeriesData = find(combinedSeriesData, [
        "id",
        seriesDataObject.id,
      ]);
      if (!availableSeriesData) {
        combinedSeriesData = [...combinedSeriesData, seriesDataObject];
      } else {
        const seriesDataIndex = findIndex(
          combinedSeriesData,
          availableSeriesData
        );
        const newSeriesObject = { ...seriesDataObject };
        newSeriesObject.y += availableSeriesData.y;
        combinedSeriesData = [
          ...combinedSeriesData.slice(0, seriesDataIndex),
          newSeriesObject,
          ...combinedSeriesData.slice(seriesDataIndex + 1),
        ];
      }
    });
  });

  return combinedSeriesData;
}
