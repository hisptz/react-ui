
import { find, map, reduce } from "lodash";

export function getDrilldownParentDataFromChildrenSeries(
  drilldownSeries:any[],
  parentId:any
) {
  let parentData = 0;
  const correspondingSeriesObject = find(drilldownSeries, ["id", parentId]);

  if (correspondingSeriesObject) {
    parentData = reduce(
      map(correspondingSeriesObject.data, (data) => data.y),
      (sum, n) => {
        const newNumber = !isNaN(n) ? parseInt(n, 10) : 0;
        return parseInt(sum, 10) + newNumber;
      }
    );
  }
  return parentData;
}
