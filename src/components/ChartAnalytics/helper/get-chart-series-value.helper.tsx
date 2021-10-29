/* eslint-disable max-params */
import { forEach, map, some } from "lodash";

export function getChartSeriesValue(
  analyticsRows:any[],
  yAxisItemIndex:any,
  yAxisItemId:any,
  xAxisItemIndex:any,
  xAxisItemId:any,
  dataIndex:any
) {
  let finalValue = 0;

  const seriesValues = map(analyticsRows, (row) => {
    let seriesValue = 0;
    let xAxisRowId = "";
    forEach(xAxisItemIndex.split("_"), (axisIndex) => {
      xAxisRowId += xAxisRowId !== "" ? "_" : "";
      xAxisRowId += row[axisIndex];
    });

    if (row[yAxisItemIndex] === yAxisItemId && xAxisRowId === xAxisItemId) {
      const value = parseFloat(row[dataIndex]);
      if (isNaN(value)) {
        return row[dataIndex];
      }
      seriesValue += value;
    }
    return seriesValue;
  }).filter((value) => value !== 0);

  if (seriesValues) {
    // Check if series values have non numeric content
    if (some(seriesValues, (seriesValue) => isNaN(seriesValue))) {
      return "";
    }
    // TODO find best way to identify ratios
    const isRatio = some(
      seriesValues,
      (seriesValue) => seriesValue.toString().split(".")[1]
    );

    const valueSum =
      seriesValues.length > 0
        ? seriesValues.reduce(
            (sum, count) => parseFloat(sum) + parseFloat(count)
          )
        : 0;

    if (isRatio) {
      finalValue = valueSum / seriesValues.length;
    } else {
      finalValue = valueSum;
    }
  }
  return finalValue !== 0 ? finalValue : null;
}
