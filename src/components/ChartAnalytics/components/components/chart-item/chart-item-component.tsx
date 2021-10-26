import * as _ from 'lodash';
import React, { useState } from 'react';
import { ChartConfigurationProps } from 'components/ChartAnalytics/interfaces/props';

export default function ChartItemComponent(chartHeight: number,analyticsObject: object,ChartConfiguration:ChartConfigurationProps){


 const [drawChartConfiguration, setdrawChartConfiguration] = useState();

 function drawChart(){
     if(drawChartConfiguration && analyticsObject ){
            drawChartConfiguration(analyticsObject);
     }
 }

     return (
         <div>

         </div>
     );
}