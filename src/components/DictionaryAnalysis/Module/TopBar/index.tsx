import { Tab, TabBar } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";

export default function TopBar({ dataSources, onTabChange, selectedTab }:any) {
    return (<TabBar>
      {dataSources?.map((dataSource:any) => (<Tab selected={selectedTab?.id === dataSource?.id} onClick={() => onTabChange(dataSource)} key={`${dataSource?.id}-tab`}>
          {dataSource?.label ?? dataSource?.displayName}
        </Tab>))}
    </TabBar>);
}

TopBar.propTypes = {
    dataSources: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedTab: PropTypes.object.isRequired,
    onTabChange: PropTypes.func.isRequired
};

