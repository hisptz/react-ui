import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../Shared/Componets/Loaders/Loader";
import classes from "./introduction.module.css";

const query = {
    indicatorsDetails: {
        resource: "indicators",
        id: ({ id }:any) => id,
        params: {
            fields: [
                "id",
                "name",
                "displayDescription",
                "href",
                "numeratorDescription",
                "denominatorDescription",
                "indicatorType[displayName,id]",
            ]
        }
    }
};

export default function Introduction({ id }:any) {
    const { loading, error, data, refetch }:any= useDataQuery(query, {
        variables: { id }
    });

    
    useEffect(() => {
        refetch({ id });
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error}/>;
    }

    const indicatorDetails = data?.indicatorsDetails;

    return (<div>
            <h2 id={"test-indicator-details"}>{indicatorDetails?.name} </h2>

            <h3>{i18n.t("Introduction")}</h3>

            <p>
                <b id={"test-indicator-details"}>{indicatorDetails?.name} </b>
                {i18n.t("is a")}
                <b> {indicatorDetails?.indicatorType?.displayName} </b>
                {i18n.t("indicator, measured by")}
                <b id={"test-indicator-details"}>
                    {" "}
                    {indicatorDetails?.numeratorDescription}{" "}
                </b>
                {i18n.t("to")}
                <b id={"test-indicator-details"}>
                    {" "}
                    {indicatorDetails?.denominatorDescription}{" "}
                </b>
            </p>

            <p id={"test-indicator-details"}>
                {i18n.t("Its described as {{variable}}", {
            variable: indicatorDetails?.displayDescription
        })}
            </p>

            <p>
        <span>
          <i onClick={() =>{
            //   onClickIdentified(indicatorDetails?.id)
          }}>
            {i18n.t("Identified by:")}{" "}
              <span id={"test-indicator-details"} className={classes.identifylink}>
              {" "}
                  {indicatorDetails?.id}{" "}
            </span>{" "}
          </i>
        </span>
            </p>
        </div>);
}

Introduction.propTypes = {
    id: PropTypes.string.isRequired
};

