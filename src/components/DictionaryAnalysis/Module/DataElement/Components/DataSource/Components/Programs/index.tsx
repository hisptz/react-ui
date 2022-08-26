import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import Error from "../../../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../../../Shared/Componets/Loaders/Loader";

const query = {
    programs: {
        resource: "programStages",
        params: ({ dataElementId }:any) => ({
            fields: ["program[id,displayName]"],
            filter: [`programStageDataElements.dataElement.id:eq:${dataElementId}`]
        })
    }
};

export default function Programs({ id }:any) {
    const dataElementId = id;

    const { loading, error, data, refetch } = useDataQuery(query, {
        variables: { dataElementId }
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
      <h3>{i18n.t("Data sources")} </h3>
      <p> {i18n.t("Data element is captured from following sources")}</p>
      <h5>{i18n.t("Programs")} </h5>

      <ul>
        {(data?.programs as any)?.programStages?.map((dt:any) => {
            return (<li key={dt?.program?.id}>
              <b>{dt?.program?.displayName}</b>{" "}
              {i18n.t("submitting records on every event(case or individual)")}{" "}
            </li>);
        })}
      </ul>
    </div>);
}

Programs.PropTypes = {
    id: PropTypes.string.isRequired
};

