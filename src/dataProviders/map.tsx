import { CustomDataProvider } from "@dhis2/app-runtime";
import React from "react";
import mapData from "../data/map.json";

export default function MapDataProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <CustomDataProvider
      data={{
        ...mapData,
        analytics: async (type, query) => {
          if (query?.params?.skipData) {
            return mapData.analytics;
          } else {
            return mapData.analyticsWithData;
          }
        },
      }}>
      {children}
    </CustomDataProvider>
  );
}
