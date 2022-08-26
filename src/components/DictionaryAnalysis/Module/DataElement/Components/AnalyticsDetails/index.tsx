import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import { CircularLoader } from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../Shared/Componets/Loaders/Loader";
import { lowerCaseAllWordsExceptFirstLetters } from "../../../../Utils/Functions/FormulaFunctions";

const query = {
    detail: {
        resource: "dataElements",
        id: ({ id }:any) => id,
        params: {
            fields: [
                "id",
                "displayName",
                "domainType",
                "aggregationType",
                "zeroIsSignificant",
                "categoryCombo[id,displayName,categories[id,displayName,categoryOptions[id,displayName]]]",
            ]
        }
    }
};

export default function AnalyticsDetails({ id }:any) {
    const { loading, error, data, refetch } = useDataQuery(query, {
        variables: { id }
    });

    useEffect(() => {
        refetch({ id });
    }, [id]);

    const result = data?.detail as any;

    if (loading) {
        return <Loader text={""}/>;
    }
    if (error) {
        return <Error error={error}/>;
    }

    return (<div>
      <h3>{i18n.t("Analytics Details")} </h3>
      <ul>
        <li>
          {i18n.t("Uses")}{" "}
          <b>
            {i18n.t(result?.aggregationType === "NONE"
            ? "NO"
            : lowerCaseAllWordsExceptFirstLetters(result?.aggregationType)?.replace(/_/g, " "))}{" "}
          </b>{" "}
          {i18n.t("aggregation type through period and hierarchy")}{" "}
        </li>
        <li>
          {" "}
          {result?.domainType} {i18n.t("data sources")}
        </li>
        <li>
          {i18n.t(result?.zeroIsSignificant
            ? "It stores zero values"
            : "It does not store zero values")}
        </li>
        <li>
          {i18n.t("Category Combo is")} {result?.categoryCombo?.displayName}{" "}
          {i18n.t("which has cross-tabulation between ")}{" "}
          {result?.categoryCombo?.categories?.length}{" "}
          {i18n.t(result?.categoryCombo?.categories?.length === 1
            ? "category"
            : "categories")}{" "}
          {i18n.t("with following details")}
          <ul>
            {result?.categoryCombo?.categories?.map((cat:any) => {
            return (<li key={cat?.id}>
                  {" "}
                  {cat?.displayName}
                  {i18n.t(cat?.categoryOptions?.length >= 0
                    ? "which also has the following options"
                    : "")}
                  <ul>
                    {cat?.categoryOptions?.map((opt:any) => {
                    return <li key={opt.id}> {cat.displayName}</li>;
                })}
                  </ul>
                </li>);
        })}
          </ul>
        </li>
      </ul>
    </div>);
}

AnalyticsDetails.propTypes = {
    id: PropTypes.string.isRequired
};

