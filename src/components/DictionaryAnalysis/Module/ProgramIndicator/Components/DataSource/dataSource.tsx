import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import React, { useEffect } from "react";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../Shared/Componets/Loaders/Loader";

const query = {
    sources: {
        resource: "programIndicators",
        id: ({ id }:any) => id,
        params: {
            fields: ["program[id,displayName]"]
        }
    }
};

export default function DataSource({ id }:any) {
    const { loading, error, data, refetch }:any = useDataQuery(query, {
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
      {" "}
      {i18n.t("Program Indicator is captured from with following program")}
      <ul>
        <li>
          {i18n.t("{{variables}} submitting records on every event", {
            variables: data?.sources?.program?.displayName
        })}
        </li>
      </ul>
    </div>);
}

