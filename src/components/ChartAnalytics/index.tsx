/* eslint-disable max-params */
import i18n from "@dhis2/d2-i18n";
import React, { Suspense } from "react";
import { ChartAnalyticsProps } from "./types/props";
import ChartItemComponent from "components/ChartAnalytics/components/chart-item/Chart-item-component";
import "./styles/index.css";

export default function ChartAnalytics({ analysisData, chartHeight = 1000, chartConfiguration }: ChartAnalyticsProps): React.ReactElement {
  return (
    <div className="chart-list">
      <Suspense fallback={<div>{i18n.t("Loading .....")}</div>}>
        <ChartItemComponent analysisData={analysisData} chartHeight={chartHeight} chartConfiguration={chartConfiguration} />
      </Suspense>
    </div>
  );
}
