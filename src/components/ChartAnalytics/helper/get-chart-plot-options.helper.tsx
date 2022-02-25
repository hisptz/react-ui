import { getAllowedChartType } from "./get-allowed-chart-types.helper";

export function getPlotOptions(chartConfiguration: any) {
  const plotOptionChartType = getAllowedChartType(chartConfiguration.type);

  // const windowObject: any = window;

  // TODO: Find best way to attach custom events into the chart
  const plotOptions: any = {
    series: {
      cursor: "pointer",
      point: {
        events: {
          click: function () {
            //TODO: Fix this reference issues;
            // const clickedChart = (windowObject["clickedCharts"] || {})[this.id];
            // const currentColor:any = this.color;
            //
            // if (!clickedChart) {
            //   if (!windowObject["clickedCharts"]) {
            //     windowObject["clickedCharts"] = {};
            //   }
            //   windowObject["clickedCharts"] = {
            //     ...windowObject["clickedCharts"],
            //     [this.id]: { color: this.color },
            //   };
            // } else {
            //   (windowObject["clickedCharts"] || {})[this.id] = null;
            // }
            //
            // this.update(
            //   {
            //     color: !clickedChart
            //       ? "#f00"
            //       : currentColor !== "#f00"
            //       ? "#f00"
            //       : clickedChart.color,
            //   },
            //   true,
            //   false
            // );
          },
        },
      },
    },
  };

  if (plotOptionChartType) {
    switch (plotOptionChartType) {
      case "solidgauge":
        plotOptions[plotOptionChartType] = {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true,
          },
        };
        break;
      case "gauge":
        plotOptions[plotOptionChartType] = {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true,
          },
        };
        break;
      case "pie":
        plotOptions[plotOptionChartType] = {
          borderWidth: 0,
          allowPointSelect: true,
          cursor: "pointer",
          showInLegend: !chartConfiguration.hideLegend,
        };
        break;
      default:
        plotOptions[plotOptionChartType !== "" ? plotOptionChartType : "series"] = {
          showInLegend: !chartConfiguration.hideLegend,
          colorByPoint: true,
        };

        /**
         * Set attributes for stacked charts
         */
        if (chartConfiguration.type === "stacked_column" || chartConfiguration.type === "stacked_bar" || chartConfiguration.type === "area") {
          plotOptions[plotOptionChartType].stacking = chartConfiguration.percentStackedValues ? "percent" : "normal";
        }

        if (chartConfiguration.type === "dotted") {
          plotOptions["line"] = {
            lineWidth: 0,
            states: {
              hover: {
                enabled: false,
              },
            },
          };
        }

        break;
    }
  }
  return plotOptions;
}
