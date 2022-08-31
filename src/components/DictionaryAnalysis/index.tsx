import { DataSourceState } from "core/state/data";
import { head } from "lodash";
import React, { useState } from "react";

import TopBar from "./Module/TopBar";
import DataSourceSelector from "./Module/TopBar/Components/DataSourceSelector";
import { DictionaryProvider } from "./Store/DictionaryContext";

export default function DictionaryAnalysis({ dataSources }: any) {
  const [selectedDataSource, setSelectedDataSource]: any = useState(head(dataSources));
  const [values,setValues]= useState();
  return (
    <div style={{ overflow: "hidden" }} className="column">
      <TopBar selectedTab={selectedDataSource} dataSources={dataSources} onTabChange={setSelectedDataSource} />
      <div style={{ overflow: "auto", maxHeight: "100%", flex: 1, padding: " 0 16px" }}>
        <DictionaryProvider value={{values,setValues}}>
          <DataSourceSelector type={selectedDataSource?.type} id={selectedDataSource?.id} />
        </DictionaryProvider>
      </div>
    </div>
  );
}
