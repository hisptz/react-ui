import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../Shared/Componets/Loaders/Loader";
import { lowerCaseAllWordsExceptFirstLetters } from "../../../../Utils/Functions/FormulaFunctions";

const query = {
    sources: {
        resource: "dataElements",
        id: ({ id }:any) => id,
        params: {
            fields: ["valueType"]
        }
    },
    expressionMatch: {
        resource: "validationRules",
        params: ({ id }:any) => ({
            fields: ["id"],
            filter: [
                `leftSide.expression:like:${id}`,
                `rightSide.expression:like:${id}`,
            ],
            rootJunction: "OR"
        })
    },
    numeratorMatch: {
        resource: "indicators",
        params: ({ id }:any) => ({
            fields: ["id"],
            filter: [`numerator:like:${id}`]
        })
    },
    denominatorMatch: {
        resource: "indicators",
        params: ({ id }:any) => ({
            fields: ["id"],
            filter: [`denominator:like:${id}`]
        })
    }
};

export default function Facts({ id }:any) {
    const { loading, error, data, refetch } = useDataQuery(query, {
        variables: { id }
    });

    useEffect(() => {
        refetch({ id });
    }, [id]);

    if (loading) {
        return <Loader text={""}/>;
    }
    if (error) {
        return <Error error={error}/>;
    }

    return (<div>
      <h3> {i18n.t("Data element Facts")} </h3>
      <ul>
        <li>
          {i18n.t("Accepts only")}{" "}
          {lowerCaseAllWordsExceptFirstLetters((data?.sources as any)?.valueType)?.replace(/_/g, " ")}{" "}
          {i18n.t("to enforce validation")}{" "}
        </li>
        <li>
          {i18n.t("Has")} {(data?.expressionMatch as any)?.validationRules?.length}{" "}
          {i18n.t("related validation rules")}
        </li>
        <li>
          {i18n.t("Part of numerators of")}{" "}
          {(data?.numeratorMatch as any)?.indicators?.length} {i18n.t("indicators")}
        </li>
        <li>
          {i18n.t("Part of denominators of")}{" "}
          {(data?.denominatorMatch as any)?.indicators?.length} {i18n.t("indicators")}
        </li>
      </ul>
    </div>);
}
Facts.propTypes = {
    id: PropTypes.string.isRequired
};

