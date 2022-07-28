import i18n from "@dhis2/d2-i18n";
import React, { Suspense } from "react";
import ChartItemComponent from "./components/chart-item/Chart-item-component";
import { ChartAnalyticsProps } from "./types/props";
import "./styles/index.css";

export default function ChartAnalytics({ analytics, height = 1000, config }: ChartAnalyticsProps): React.ReactElement {
  return (
    <div className="chart-list">
      <Suspense fallback={<div>{i18n.t("Loading .....")}</div>}>
        <ChartItemComponent analytics={analytics} height={height} config={config} />
      </Suspense>
    </div>
  );
}
