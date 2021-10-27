/* eslint-disable no-unused-vars */
import { assign, map } from "lodash";

export function getChartAxisItems(analyticsObject:any, axisTypeArray:Array<any>, isCategory:boolean = false) {
  let items:Array<any> = [];
  const metadataNames = analyticsObject.metaData.names;
  axisTypeArray?.forEach((axisType, axisIndex) => {
    const itemKeys = analyticsObject.metaData[axisType] ?? [];
    if (itemKeys) {
      if (axisIndex > 0) {
        const availableItems = assign([], items);
        items = [];
        itemKeys.forEach((itemKey:any) => {
          availableItems.forEach((item:any) => {
            items.push({
              id: item.id + "_" + itemKey,
              name: item.name + "_" + metadataNames[itemKey].trim(),
            });
          });
        });
      } else {
        items = map(itemKeys, (itemKey) => {
          return {
            id: itemKey,
            name: metadataNames[itemKey].trim(),
          };
        });
      }
    }
  });
  return items;
}
