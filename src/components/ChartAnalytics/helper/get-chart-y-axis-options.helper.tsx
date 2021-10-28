import { assign, map } from "lodash";

export function getChartYAxisOptions(chartConfiguration:any) {
  const yAxes:any[] = chartConfiguration.axes;
  let newYAxes:any[] = [];

  if (yAxes.length == 0) {
    newYAxes = assign(
      [],
      [
        {
          min: chartConfiguration.rangeAxisMinValue,
          max: chartConfiguration.rangeAxisMaxValue,
          title: {
            text: "",
            style: {
              color: "#000000",
              fontWeight: "normal",
              fontSize: "14px",
            },
          },
        },
      ]
    );
  } else {
    newYAxes = map(yAxes, (yAxis) => {
      return {
        min: chartConfiguration.rangeAxisMinValue,
        max: chartConfiguration.rangeAxisMaxValue,
        title: {
          text: yAxis.name,
          style: { color: "#000000", fontWeight: "normal", fontSize: "14px" },
        },
        opposite: yAxis.orientation === "left" ? false : true,
      };
    });
  }

  return map(newYAxes, (yAxis) => {
    /**
     * Get more options depending on chart type
     */
    switch (chartConfiguration.type) {
      case "radar":
        yAxis["gridLineInterpolation"] = "polygon";
        yAxis["lineWidth"] = 0;
        break;
      case "solidgauge":
        yAxis["lineWidth"] = 0;
        yAxis["labels"] = {
          y: 16,
        };
        yAxis["max"] = 100;
        break;
      case "stacked_column":
        yAxis["stackLabels"] = {
          enabled: false,
          style: {
            fontWeight: "bold",
          },
        };
        break;
      default:
        yAxis["labels"] = {
          style: { color: "#000000", fontWeight: "normal", fontSize: "14px" },
        };
        yAxis["plotLines"] = [
          {
            color: "#000000",
            dashStyle: "Solid",
            value: chartConfiguration.targetLineValue,
            width: 2,
            zIndex: 1000,
            label: {
              text: chartConfiguration.targetLineLabel,
            },
          },
          {
            color: "#000000",
            dashStyle: "Solid",
            value: chartConfiguration.baseLineValue,
            zIndex: 1000,
            width: 2,
            label: {
              text: chartConfiguration.baseLineLabel,
            },
          },
        ];
        break;
    }
    return yAxis;
  });
}
