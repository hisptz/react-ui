import React from "react";
import AccessibilityAndSharing from "../../Shared/Componets/AccesibilityAndSharing";
import DataElementSIndicator from "../../Shared/Componets/dataElementsInIndicator/dataElementsIndicator";
import DataSources from "./Components/DataSources";
import Facts from "./Components/Facts";
import Introduction from "./Components/Introduction";
import RelatedIndicator from "./Components/RelatedIndicator";

export default function DataElementGroupPage(props:any) {
    const id = props.id;

    return (<div style={{ display: "flex", flexDirection: "column" }}>
      <Introduction id={id}/>
      <DataSources id={id}/>
      <Facts id={id}/>
      <RelatedIndicator id={id}/>
      <DataElementSIndicator resourceType={"Data Element Group"}/>
      <AccessibilityAndSharing id={id} resourceType={"dataElementGroups"}/>
    </div>);
}

