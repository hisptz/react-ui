import { assign, clone, find, findIndex, reverse } from "lodash";

export function getCumulativeFormatForAnalytics(
  analyticsObject:any,
  xAxisType:any,
  yAxisType:any
) {
  const newAnalyticsObject = clone(analyticsObject);

  if (analyticsObject) {
    const yAxisDimensionArray = analyticsObject.metadata[yAxisType];
    const xAxisDimensionArray = [
      ...reverse([...analyticsObject.metadata[xAxisType]]),
    ];

    const yAxisDimensionIndex = findIndex(
      analyticsObject.headers,
      find(analyticsObject.headers, ["name", yAxisType])
    );
    const xAxisDimensionIndex = findIndex(
      analyticsObject.headers,
      find(analyticsObject.headers, ["name", xAxisType])
    );

    const dataValueIndex = findIndex(
      analyticsObject.headers,
      find(analyticsObject.headers, ["name", "value"])
    );

    const newRows:any[] = [];

    yAxisDimensionArray.forEach((yAxisDimensionValue:any) => {
      let initialValue = 0;
      xAxisDimensionArray.forEach((xAxisDimensionValue) => {
        analyticsObject.rows.forEach((row:any) => {
          if (
            row[yAxisDimensionIndex] === yAxisDimensionValue &&
            row[xAxisDimensionIndex] === xAxisDimensionValue
          ) {
            initialValue += parseInt(row[dataValueIndex], 10);
            const newRow = clone(row);
            newRow[dataValueIndex] = initialValue;
            newRows.push(newRow);
          }
        });
      });
    });

    newAnalyticsObject.rows = assign([], newRows);
  }
  return newAnalyticsObject;
}
