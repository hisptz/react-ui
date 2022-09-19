import i18n from "@dhis2/d2-i18n";
import PropTypes  from "prop-types";
import React from "react";
import IdentifiedBy from "../../../../Shared/Componets/IdentifiedBy/Index";

export default function Introduction({ ruleObj, functionObj }:any) {
    return (<div>
      <h3>{i18n.t("Introduction")} </h3>
      <p>
        {" "}
        <b> {ruleObj?.name} </b>{" "}
        {i18n.t(ruleObj?.description ? "can be best described as: {{variables}}" : "", { variables: ruleObj?.description })}
      </p>

      <IdentifiedBy id={ruleObj?.id} href={functionObj?.href}/>
    </div>);
}

Introduction.PropTypes = {
    ruleObj: PropTypes.object.isRequired,
    functionObj: PropTypes.object.isRequired
};

