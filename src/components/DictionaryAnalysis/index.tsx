import { head } from "lodash";
import React, { useState } from "react";

import TopBar from "./Module/TopBar";
import DataSourceSelector from "./Module/TopBar/Components/DataSourceSelector";
import { DictionaryProvider } from "./Store/DictionaryContext";

export default function DictionaryAnalysis({ dataSources }: any) {
  const [selectedDataSource, setSelectedDataSource]: any = useState(head(dataSources));

  const [values, setValues] = useState();
  return (
    <DictionaryProvider value={{ values, setValues }}>
      <div style={{ overflow: "hidden" }} className="column">
        <TopBar selectedTab={selectedDataSource} dataSources={dataSources} onTabChange={setSelectedDataSource} />
        <div style={{ overflow: "auto", maxHeight: "100%", flex: 1, padding: " 0 16px" }}>
          <DataSourceSelector  id={selectedDataSource?.id}  />
        </div>
      </div>
    </DictionaryProvider>
  );
}
