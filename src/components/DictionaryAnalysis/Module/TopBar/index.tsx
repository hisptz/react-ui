import { useDataEngine, useDataQuery } from "@dhis2/app-runtime";
import { Tab, TabBar } from "@dhis2/ui";
import { getDataSourceType } from "./../../../../core/utils/dataSource";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

export default function TopBar({ dataSources, onTabChange, selectedTab }: any) {
  const engine = useDataEngine();
  const [data, setData]: any = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(dataSources.map(async (source: any) => await getDataSourceType(engine, source.id)));
      setData(data.map((x) => ({ id: x.object.id, label: x.object.name })));
    };

    fetchData().catch();
  }, [dataSources]);

  return (
    <TabBar>
      {data?.map((dataSource: any,index:number) => (
        <Tab  selected={selectedTab?.id === dataSource?.id} onClick={() => onTabChange(dataSource)} key={`${dataSource?.id}-tab-${index}`}>
          {dataSource?.label ?? dataSource?.displayName}
        </Tab>
      ))}
    </TabBar>
  );
}

TopBar.propTypes = {
  dataSources: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTab: PropTypes.object.isRequired,
  onTabChange: PropTypes.func.isRequired,
};
