import { each, filter, find, flatten, intersection, map, some } from "lodash";
import { ChartConfiguration } from "../interfaces/props";
import { getChartExportingOptions } from "./get-chart-exporting-options.helper";

export function getSanitizedChartObject(chartObject:any, chartConfiguration:ChartConfiguration) {
  const dataSelectionGroups = flatten(
    filter(
      map(chartConfiguration.dataSelections || [], (dataSelection) => {
        return dataSelection.groups;
      }),
      (group) => group
    )
  );

  const dataSelectionGroupMembers = flatten(
    map(dataSelectionGroups, (group) => {
      return map(group.members, (member) => `${member.id}_${group.id}`);
    })
  );

  // Remove non numeric series data and their categories
  const dataIndexesArrayToRemove = map(chartObject.series, (seriesObject) => {
    return filter(
      map(seriesObject.data, (dataItem, dataIndex) =>
        dataItem.y === "" ||
        (dataSelectionGroupMembers.length > 0 &&
          dataSelectionGroupMembers.indexOf(dataItem.id) === -1)
          ? dataIndex
          : -1
      ),
      (dataIndex) => dataIndex !== -1
    );
  });

  let newDataIndexes:any[] = [];
  each(dataIndexesArrayToRemove, (dataIndexes) => {
    newDataIndexes = newDataIndexes.length === 0 ? dataIndexes : newDataIndexes;
    newDataIndexes = intersection(newDataIndexes, dataIndexes);
  });

  const newSeries = map(chartObject.series, (seriesObject) => {
    return {
      ...seriesObject,
      data: filter(
        map(seriesObject.data, (dataItem) => {
          const splitedDataItemId = dataItem.id.split("_");

          const associatedGroup = find(dataSelectionGroups, [
            "id",
            splitedDataItemId[1],
          ]);

          // TODO: Need to find a way to generically handle color assignment from click event
          const clickedChart = (window["clickedCharts"] || {})[dataItem.id];

          if (clickedChart) {
            return { ...dataItem, color: "#f00" };
          }

          return associatedGroup &&
            some(
              associatedGroup.members,
              (member) => member.id === splitedDataItemId[0]
            ) &&
            associatedGroup.color
            ? { ...dataItem, color: associatedGroup.color }
            : dataItem;
        }),
        (dataItem, dataIndex) => newDataIndexes.indexOf(dataIndex) === -1
      ),
    };
  });

  let categoryCount = 0;
  const newCategories = map(chartObject.xAxis.categories, (category) => {
    if (!category.categories) {
      return category;
    }
    const newCategory = {
      ...category,
      categories: filter(
        category.categories,
        (innerCategory, innerCategoryIndex) =>
          newDataIndexes.indexOf(innerCategoryIndex + categoryCount) === -1
      ),
    };

    categoryCount += category.categories ? category.categories.length : 0;
    return newCategory;
  });

  return {
    ...chartObject,
    series: newSeries,
    xAxis: { ...chartObject.xAxis, categories: newCategories },
    exporting: getChartExportingOptions(newCategories),
  };
}
