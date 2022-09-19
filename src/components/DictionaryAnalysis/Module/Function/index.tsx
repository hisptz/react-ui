import React from "react";
import AccessibilityAndSharingFunction from "./Components/AccessibilityAndSharing";
import AccessibilityAndSharing from "./Components/AccessibilityAndSharing";
import ApiEndPoint from "./Components/ApiEndPoint";
import DataSource from "./Components/DataSource";
import Facts from "./Components/Facts";
import Introduction from "./Components/Introduction";
import Rules from "./Components/Rules";

export default function FunctionPage({ ruleObj, functionObj }:any) {
    return (<div>
      <Introduction ruleObj={ruleObj} functionObj={functionObj}/>
      <DataSource json={ruleObj?.json}/>
      <Rules ruleObj={ruleObj} functionObj={functionObj}/>
      <Facts functionObj={functionObj}/>
      {/*<ApiEndPoint selected={selected} />*/}

      <AccessibilityAndSharing id={functionObj?.id}/>
    </div>);
}

