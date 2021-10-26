/* eslint-disable max-params */
import React, { Suspense } from 'react';
import { ChartConfigurationProps } from '../interfaces/props';
import '../styles/index.css';
import ChartItemComponent from './components/chart-item/chart-item-component';

export default function ChartAnalytics( analysisData: any,
  chartHeight: number = 2000,
  analyticsObject: any,
  chartConfiguration: ChartConfigurationProps){
    return <div>
         <div className="chart-list">
      <Suspense fallback={<div>Loading .....</div>}>
        <ChartItemComponent analysisDat={analysisData} chartHeight={chartHeight} analyticsObject={analyticsObject} chartConfiguration={chartConfiguration}/>
      </Suspense>
    </div>
    </div>
}