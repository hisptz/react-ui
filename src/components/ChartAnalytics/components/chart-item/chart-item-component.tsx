/* eslint-disable max-params */
/* eslint-disable no-unused-vars */
import HighCharts from "highcharts";
import * as _ from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { getCharObject } from "../../helper/get-chart-object.helper";
import { getChartConfiguration } from "components/ChartAnalytics/helper/get-chart-configuration.helper";
import { ChartAnalyticsProps, ChartConfigurationProps } from "components/ChartAnalytics/types/props";
import { CHART_TYPES } from "core/constant/chart-types.constant";
import './chart-item-component.css';
import { uid } from "core/utils";

export default function ChartItemComponent(
{  analysisData,
  chartHeight,
  chartConfiguration}:ChartAnalyticsProps
) {
 
  const [chartTypes] = useState(CHART_TYPES);
  const [currentChartType, setCurrentChartType] = useState(chartConfiguration.currentChartType);
  const [chartUpdate, setChartUpdate] = useState({
    id: "",
    type: "",
  });

  let chart: any = "";

  const [drawChartConfiguration,setDrawChartConfiguration] = useState(
    chartConfigurationSelector(
      chartConfiguration.layout,
      currentChartType
    )
  );

  useEffect(() => {   
    drawChart(analysisData["_data"], drawChartConfiguration);
  }, [
    analysisData,
    chartConfiguration.layout,
    currentChartType,
  ]);
  const renderId:any = useMemo(() => uid(), [])

  function drawChart(analyticsObject: any, drawChartConfiguration: any) {
    if (drawChartConfiguration && analyticsObject) {
      const chartObject = getCharObject(
        analyticsObject,
        drawChartConfiguration
      );
      if (chartObject) {
        setTimeout(() => {
          chart = HighCharts.chart(renderId, chartObject);
        }, 20);
      }
    }
  }
  function chartConfigurationSelector(layout: any, currentChartType: any) {
    const configuration = getChartConfiguration(
      {},
      "render-id-unique",
      layout,
      "",
      currentChartType,
      []
    );
    return configuration;
  }

  function updateChartType(chartType: any, event: any) {
    event.stopPropagation();
    
    setCurrentChartType(chartType);
    setDrawChartConfiguration( chartConfigurationSelector(
      chartConfiguration.layout,
      chartType
    ))
    drawChart(analysisData["_data"], {
      ...drawChartConfiguration,
      type: chartType,
    });

    setChartUpdate({
      id: "render-id-unique",
      type: chartType.toUpperCase,
    });
  }

  return (
    <div className="chart-item-container" style={{ width: "100%" }}>
      <div
        id={renderId}        
        className="chart-block"
        style={{ height: "calc(" + chartHeight + "px-20px", width: "100%" }}
      ></div>

      <ul 
                  id="dataImg" className="chart-type-list animated fadeInRight">
        {chartTypes?.map((chartType, chartTypePosition) => {
          return (
            <li key={"chart-type" + chartTypePosition}>
              <button
                onClick={(e) => updateChartType(chartType.type, e)}
                title={chartType.description}
                className={
                  chartConfiguration.currentChartType == chartType.type
                    ? "active-chart-type"
                    : ""
                }
              >
                <img
                  src={chartType.icon}
                  className="chart-option-icon"
                  alt=""
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
