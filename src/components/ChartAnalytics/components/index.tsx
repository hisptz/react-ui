import React, { Suspense } from 'react';
import '../styles/index.css';

export default function ChartAnalytics({}){
    return <div>
         <div className="chart-list">
      <Suspense fallback={<div>Loading .....</div>}>
        {/* <ChartItemComponent chartHeight={2000} /> */}
      </Suspense>
    </div>
    </div>
}