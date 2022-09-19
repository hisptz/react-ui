import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import { filter } from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useMemo } from "react";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../Shared/Componets/Loaders/Loader";
import { dataElementDomainTypes } from "../../../../Utils/Models";
import DataSets from "./DataSets";
import Programs from "./Programs";

const query = {
    sources: {
        resource: "dataElementGroups",
        id: ({ id }:any) => id,
        params: {
            fields: ["dataElements[id,displayName,domainType]"]
        }
    }
};

export default function DataSources({ id }:any) {
    const { loading, error, data, refetch } = useDataQuery(query, {
        variables: { id }
    });

    useEffect(() => {
        refetch({ id });
    }, [id]);

    const tracker = useMemo(() => filter((data?.sources as any)?.dataElements, (el) => {
        return el?.domainType === dataElementDomainTypes.TRACKER;
    }), [data]);
    const aggregate = useMemo(() => filter((data?.sources as any)?.dataElements, (el) => {
        return el?.domainType === dataElementDomainTypes.AGGREGATE;
    }), [data]);

    if (loading) {
        return <Loader text={""}/>;
    }
    if (error) {
        return <Error error={error}/>;
    }

    return (<div>
      <h3>{i18n.t("Data sources (Datasets/Programs)")} </h3>
      <p>
        {" "}
        {i18n.t("Data elements in this group are captured from the following sources")}{" "}
      </p>

      {(data?.sources as any)?.dataElements?.length === 0
            ? i18n.t("There are no Data Elements in this Data Element group")
            : ""}

      {aggregate?.length > 0 ? (<h4>{i18n.t("For Aggregate Data Elements:")} </h4>) : ("")}
      {aggregate?.length > 0 ? <DataSets aggregate={aggregate}/> : ""}

      {tracker?.length > 0 ? (<h4>{i18n.t("For Tracker Data Elements:")} </h4>) : ("")}
      {tracker?.length > 0
            ? tracker.map((el) => {
                return <Programs id={el?.id} name={el?.displayName}/>;
            })
            : ""}
    </div>);
}

DataSources.prototype = {
    id: PropTypes.string.isRequired
};

