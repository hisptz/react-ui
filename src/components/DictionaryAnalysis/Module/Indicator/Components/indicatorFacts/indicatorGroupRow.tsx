import i18n from "@dhis2/d2-i18n";
import { DataTableRow, DataTableCell, Button } from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useState } from "react";

import classes from "./indicatorGroupRow.module.css";

export default function IndicatorGroupRow(props:any) {
    function dispList(list:any) {
        let items;
        if (isListFull) {
            items = list?.map((ind:any) => {
                return (<li key={ind.id} className={classes.indicatorRowLink} onClick={() => navigateToIndicatorHandler(ind?.id)}>
            {ind?.displayName}
          </li>);
            });
        }
        else {
            list = list.slice(0, 3); //just first three
            items = list.map((ind:any) => {
                return (<li key={ind?.id} className={classes.indicatorRowLink} onClick={() => navigateToIndicatorHandler(ind?.id)}>
            {ind?.displayName}
          </li>);
            });
        }

        return items;
    }

    function toogleIndicatorList() {
        isListFull ? setListFull(false) : setListFull(true);
        dispList(props.indicators);
    }

    const [isListFull, setListFull] = useState(false);


    function navigateToIndicatorHandler(id:any) {
       // history.replace("/indicator/" + id);
    }

    return (<DataTableRow>
      <DataTableCell bordered>{props.no}</DataTableCell>
      <DataTableCell bordered>{props.name}</DataTableCell>
      <DataTableCell bordered>{props.code}</DataTableCell>
      <DataTableCell bordered>
        <ol>{dispList(props?.indicators)}</ol>
        {props?.indicators?.length > 3 ? (<Button name="Basic button" onClick={toogleIndicatorList} value="default">
            {i18n.t(isListFull ? "Show less" : "Show more")}
          </Button>) : null}
      </DataTableCell>
    </DataTableRow>);
}

IndicatorGroupRow.PropTypes = {
    no: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    indicators: PropTypes.arrayOf(Object)
};

