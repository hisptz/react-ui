import HighCharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { CHART_TYPES } from "../../../../core/constant/chart-types.constant";
import { getChartConfiguration } from "../../helper/get-chart-configuration.helper";
import { getCharObject } from "../../helper/get-chart-object.helper";
import { ChartAnalyticsProps } from "../../types/props";
import "./chart-item-component.css";

export default function ChartItemComponent({ analysisData, chartHeight, chartConfiguration }: ChartAnalyticsProps) {
  const [chartTypes] = useState(CHART_TYPES);
  const [currentChartType, setCurrentChartType] = useState(chartConfiguration.currentChartType);
  const [chartOptions, setChartOptions] = useState();

  const [drawChartConfiguration, setDrawChartConfiguration] = useState(chartConfigurationSelector(chartConfiguration.layout, currentChartType));

  useEffect(() => {
    drawChart(analysisData["_data"], drawChartConfiguration);
  }, [analysisData, chartConfiguration.layout, currentChartType]);

  function drawChart(analyticsObject: any, drawChartConfiguration: any) {
    if (drawChartConfiguration && analyticsObject) {
      const chartObject = getCharObject(analyticsObject, drawChartConfiguration);
      if (chartObject) {
        setChartOptions(chartObject);
      }
    }
  }

  function chartConfigurationSelector(layout: any, currentChartType: any) {
    return getChartConfiguration({}, "", layout, "", currentChartType, []);
  }

  function updateChartType(chartType: any, event: any) {
    event.stopPropagation();

    setCurrentChartType(chartType);
    setDrawChartConfiguration(chartConfigurationSelector(chartConfiguration.layout, chartType));
    drawChart(analysisData["_data"], {
      ...drawChartConfiguration,
      type: chartType,
    });
  }

  return (
    <div className="chart-item-container" style={{ width: "100%" }}>
      <div
        className="chart-block"
        style={{
          height: "calc(" + chartHeight + "px-20px",
          width: "100%",
        }}>
        <HighchartsReact highcharts={HighCharts} options={chartOptions} />
      </div>
      <ul id="dataImg" className="chart-type-list animated fadeInRight">
        {chartTypes?.map((chartType, chartTypePosition) => {
          return (
            <li key={"chart-type" + chartTypePosition}>
              <button
                onClick={(e) => updateChartType(chartType.type, e)}
                title={chartType.description}
                className={chartConfiguration.currentChartType == chartType.type ? "active-chart-type" : ""}>
                <img src={chartType.icon} className="chart-option-icon" alt="" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
