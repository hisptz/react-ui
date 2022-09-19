import i18n from "@dhis2/d2-i18n";
import PropTypes from "prop-types";
import React from "react";

export default function DisplaySourceProgramDataElementOrAttribute({ title, data, }:any) {
    return (<>
      <ul>
        {data.map((el:any) => {
            return (<li key={el.id}>
              <b>{el?.val} </b> {i18n.t("source:")} {el?.sources}
            </li>);
        })}
      </ul>
    </>);
}

DisplaySourceProgramDataElementOrAttribute.PropTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};

