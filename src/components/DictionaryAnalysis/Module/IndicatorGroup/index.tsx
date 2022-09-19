import PropTypes from "prop-types";
import React from "react";
import AccessibilityAndSharing from "../../Shared/Componets/AccesibilityAndSharing";
import DataSources from "./Components/DataSources";
import Facts from "./Components/Facts";
import Introduction from "./Components/Introduction";
import RelatedDataElements from "./Components/RelatedDataElements";

export default function IndicatorGroupPage(props:any) {
    const id = props.id;

    return (<div style={{ display: "flex", flexDirection: "column" }}>
      <Introduction id={id}/>
      <DataSources id={id}/>

      <Facts id={id}/>
      <RelatedDataElements />

      <AccessibilityAndSharing id={id} resourceType={"indicatorGroups"}/>
    </div>);
}

IndicatorGroupPage.PropTypes = {
    id: PropTypes.string.isRequired
};

