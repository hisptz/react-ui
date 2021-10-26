import { assign } from "lodash";
import { ChartConfiguration } from "../interfaces/props";

export function getChartXAxisOptions(xAxisCategories:any[], chartConfiguration:ChartConfiguration) {
  let xAxisOptions = {};

  switch (chartConfiguration.type) {
    case "radar":
      xAxisOptions = assign(
        {},
        {
          categories: xAxisCategories,
          tickmarkPlacement: "on",
          lineWidth: 0,
        }
      );
      break;
    default:
      xAxisOptions = assign(
        {},
        {
          categories: [
            ...xAxisCategories?.map((xAxisCategory) => xAxisCategory.name),
          ],
          labels: {
            rotation: 0,
            useHTML: true,
            allowOverlap: true,
            style: {
              color: "#000000",
              fontWeight: "normal",
              fontSize: "12px",
              wordBreak: "break-all",
              textOverflow: "allow",
            },
          },
        }
      );
      break;
  }
  return xAxisOptions;
}
