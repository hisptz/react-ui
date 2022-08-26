import i18n from "@dhis2/d2-i18n";
import { Button } from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./indicatorGroupRow.module.css";

export default function DisplayList({ list }:any) {
    const [isListFull, setListFull] = useState(false);

    const [inList, setInList] = useState(list.slice(0, 3));
    const history = useHistory();

    function toogleIndicatorList() {
        setInList((prev:any) => {
            const tmp = prev;
            if (prev.length > 3) {
                return [...tmp.slice(0, 3)];
            }
            else {
                return list;
            }
        });
        isListFull ? setListFull(false) : setListFull(true);
    }

    function navigateToIndicatorHandler(id:any) {
        history.replace("/programIndicator/" + id);
    }

    if (isListFull) {
        return (<>
        <ul>
          {inList?.map((ind:any) => {
                return (<li key={ind.id} className={classes[`indicator-row-link`]} onClick={() => navigateToIndicatorHandler(ind?.id)}>
                {ind?.displayName}
              </li>);
            })}
        </ul>
        {list.length > 3 ? (<Button name="Basic button" onClick={toogleIndicatorList} value="default">
            {isListFull ? i18n.t("show less") : i18n.t("show more")}
          </Button>) : null}
      </>);
    }
    else {
        return (<>
        <ul>
          {inList.map((ind:any) => {
                return (<li key={ind?.id} className={classes[`indicator-row-link`]} onClick={() => navigateToIndicatorHandler(ind?.id)}>
                {ind?.displayName}
              </li>);
            })}
        </ul>
        {list.length > 3 ? (<Button name="Basic button" onClick={toogleIndicatorList} value="default">
            {isListFull ? i18n.t("show less") : i18n.t("show more")}
          </Button>) : null}
      </>);
    }
}

DisplayList.propTypes = {
    list: PropTypes.array.isRequired
};

