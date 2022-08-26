import { head } from "lodash";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { DataSourceState } from "../../state/data";
import TopBar from "./Module/TopBar";
import DataSourceSelector from "./Module/TopBar/Components/DataSourceSelector";

export default function DictionaryAnalysis() {
    const dataSources = useRecoilValue(DataSourceState) ?? [];
    const [selectedDataSource, setSelectedDataSource]:any = useState(head(dataSources));

    return (<div style={{ overflow: "hidden" }} className="column">
            <TopBar selectedTab={selectedDataSource} dataSources={dataSources} onTabChange={setSelectedDataSource}/>
            <div style={{ overflow: "auto", maxHeight: "100%", flex: 1, padding: " 0 16px" }}>
                <DataSourceSelector type={selectedDataSource?.type} id={selectedDataSource?.id}/>
            </div>
        </div>);
}

