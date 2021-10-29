import {
    assign,
    filter,
    find,
    findIndex,
    forEach,
    groupBy,
    map,
    reverse,
    times,
    uniqBy,
  } from "lodash";
  
  export function getSanitizedChartXAxisCategories(series:any[], xAxisItems:any) {
    const reversedXAxisItems = reverse(xAxisItems || []);
    let newCategories:any[] = [];
    if (series) {
      const seriesDataObjects = map(series, (seriesObject) => seriesObject.data);
  
      if (seriesDataObjects) {
        const seriesCategoryNamesArray = map(seriesDataObjects, (seriesData) => {
          return map(seriesData, (data) => {
            const idArray = data.name.split("_");
            const newCategoryArray:any[] = [];
            if (idArray) {
              const reversedIdArray = reverse(idArray);
              times(idArray.length, (num) => {
                if (num === 0) {
                  const parentCategoryItem = find(reversedXAxisItems[num] || [], [
                    "id",
                    reversedIdArray[num],
                  ]);
  
                  newCategoryArray.push({
                    id: reversedIdArray[num],
                    name: parentCategoryItem
                      ? parentCategoryItem.label || parentCategoryItem.name
                      : reversedIdArray[num],
                  });
                } else {
                  const parentCategory = find(newCategoryArray, [
                    "id",
                    reversedIdArray[num - 1],
                  ]);
  
                  if (parentCategory) {
                    const parentCategoryIndex = findIndex(
                      newCategoryArray,
                      parentCategory
                    );
                    let newChildrenCategories = parentCategory.categories
                      ? parentCategory.categories
                      : [];
                    const childrenCategoryItem = find(
                      reversedXAxisItems[num] || [],
                      ["id", reversedIdArray[num]]
                    );
  
                    newChildrenCategories = [
                      ...newChildrenCategories,
                      childrenCategoryItem
                        ? childrenCategoryItem.label || childrenCategoryItem.name
                        : reversedIdArray[num],
                    ];
  
                    parentCategory.categories = assign([], newChildrenCategories);
  
                    newCategoryArray[parentCategoryIndex] = parentCategory;
                  }
                }
              });
            }
            return newCategoryArray[0];
          });
        });
  
        if (seriesCategoryNamesArray) {
          const groupedCategoryNames = groupBy(
            seriesCategoryNamesArray[0],
            "name"
          );
          const categoryNameGroupKeys = map(
            seriesCategoryNamesArray[0],
            (category) => category.name
          );
          const sanitizedCategoryNames:any[] = [];
          forEach(categoryNameGroupKeys, (key) => {
            const categories = filter(
              map(groupedCategoryNames[key], (categoryObject) => {
                return categoryObject.categories
                  ? categoryObject.categories[0]
                  : null;
              }),
              (category) => category !== null
            );
            if (categories.length === 0) {
              sanitizedCategoryNames.push({ name: key });
            } else {
              sanitizedCategoryNames.push({
                name: key,
                categories: categories,
              });
            }
          });
  
          newCategories = assign([], sanitizedCategoryNames);
        }
      }
    }
    return uniqBy(newCategories, "name");
  }
  