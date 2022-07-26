import { CustomDataProvider } from "@dhis2/app-runtime";
import React from "react";
import dataItems from "../data/dataItems.json";

export default function DataSourceProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <CustomDataProvider
      data={{
        ...(dataItems as any),
      }}>
      {children}
    </CustomDataProvider>
  );
}
