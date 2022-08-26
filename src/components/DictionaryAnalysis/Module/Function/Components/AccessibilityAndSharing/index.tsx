import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import { TableHead, TableBody, DataTable, DataTableRow, DataTableCell, DataTableColumnHeader, CircularLoader, } from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../Shared/Componets/Loaders/Loader";
import { displayAccessPermission } from "../../../../Utils/Functions/DataElementDictionaryFunctions";
import OtherDetails from "./Componets/OtherDetails";

const query = {
    sources: {
        resource: "dataStore/functions",
        id: ({ id }:any) => id + "/metaData"
    }
};

export default function AccessibilityAndSharing({ id }:any) {
    useEffect(() => {
        refetch({ id });
    }, [id]);

    const { loading, error, data, refetch } = useDataQuery(query, {
        variables: { id }
    });

    const result = data?.sources as any;

    if (loading) {
        return <Loader text={""}/>;
    }
    if (error) {
        return <Error error={error}/>;
    }

    return (<div>
      <h3>{i18n.t("Accesibility & Sharing Settings")} </h3>
      <p>
        {" "}
        {i18n.t("This Function was first created on")}{" "}
        <i> {new Date(result?.created).toLocaleString("en-GB")}</i>{" "}
        {i18n.t(result?.user?.displayName ? "by" : "")}{" "}
        <b>{result?.user?.displayName} </b> {i18n.t("and last updated on")}{" "}
        <i>{new Date(result?.lastUpdated).toLocaleString("en-GB")}</i>{" "}
        {i18n.t(result?.lastUpdatedBy?.displayName ? "by" : "")}{" "}
        <b>{result?.lastUpdatedBy?.displayName}</b> .
      </p>
      {result?.userAccesses?.length > 0 &&
            result?.userGroupAccesses?.length > 0 ? (<OtherDetails result={result}/>) : ("")}
    </div>);
}

AccessibilityAndSharing.propTypes = {
    id: PropTypes.string.isRequired
};

