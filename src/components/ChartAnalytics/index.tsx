/* eslint-disable max-params */
import React, { Suspense } from 'react';
import ChartItemComponent from './components/chart-item/chart-item-component';
import { ChartAnalyticsProps, } from './types/props';
import './styles/index.css';

export default function ChartAnalytics({ analysisData,
  chartHeight = 1000,
  chartConfiguration}:ChartAnalyticsProps){
    return <div>
         <div className="chart-list">
      <Suspense fallback={<div>Loading .....</div>}>
        <ChartItemComponent analysisData={analysisData} chartHeight={chartHeight}  chartConfiguration={chartConfiguration}/>
      </Suspense>
    </div>
    </div>
}