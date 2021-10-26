/* eslint-disable max-params */
/* eslint-disable no-unused-vars */
import HighCharts from 'highcharts';
import * as _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { getCharObject } from '../../../helper/get-chart-object.helper';
import { ChartConfigurationProps } from 'components/ChartAnalytics/interfaces/props';

export default function ChartItemComponent(analysisData:any,chartHeight: number,analyticsObject: any, chartConfiguration:ChartConfigurationProps){


 const [drawChartConfiguration] = useState({"d":"d"});
 
 let chart:any = '';


useEffect(() => {
    drawChart(analysisData['_data'], drawChartConfiguration);  
  
}, [analysisData,chartConfiguration.layout,chartConfiguration.currentChartType]);

 function drawChart(analyticsObject:any, drawChartConfiguration:any){
     if(drawChartConfiguration && analyticsObject ){
            const chartObject = getCharObject(analyticsObject, drawChartConfiguration);
            if(chartObject){
                setTimeout(()=>{
chart = HighCharts.chart("renderId",chartObject)
                },20)
            }

     }
 }

     return (
         <div>

         </div>
     );
}