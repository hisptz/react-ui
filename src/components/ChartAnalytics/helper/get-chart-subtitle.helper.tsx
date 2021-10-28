import { map } from "lodash";

export function getChartSubtitleObject(chartConfiguration:any, analyticsObject:any) {
  if (chartConfiguration.hideSubtitle) {
    return null;
  }
  return {
    text: map(chartConfiguration.zAxisType, (zAxis) =>
      map(
        analyticsObject && analyticsObject.metaData
          ? analyticsObject.metaData[zAxis] || []
          : [],
        (itemId) =>
          analyticsObject &&
          analyticsObject.metaData &&
          analyticsObject.metaData.names
            ? analyticsObject.metaData.names[itemId] || []
            : []
      ).join(", ")
    ).join(" - "),
    align: "left",
    style: {
      fontWeight: "600",
      fontSize: "13px",
    },
  };
}
