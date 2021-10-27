/* eslint-disable max-params */
import React, { Suspense } from 'react';
import { ChartAnalyticsProps, } from '../interfaces/props';
import '../styles/index.css';
import ChartItemComponent from './components/chart-item/chart-item-component';

export default function ChartAnalytics({ analysisData,
  chartHeight = 2000,
  chartConfiguration}:ChartAnalyticsProps){
    return <div>
         <div className="chart-list">
      <Suspense fallback={<div>Loading .....</div>}>
        <ChartItemComponent analysisData={analysisData} chartHeight={chartHeight}  chartConfiguration={chartConfiguration}/>
      </Suspense>
    </div>
    </div>
}