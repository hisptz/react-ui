import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import React, { useEffect } from "react";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import IdentifiedBy from "../../../../Shared/Componets/IdentifiedBy/Index";
import Loader from "../../../../Shared/Componets/Loaders/Loader";

const query = {
    dataElementGroups: {
        resource: "indicatorGroups",
        id: ({ id }:any) => id,
        params: {
            fields: ["id", "displayName", "href"]
        }
    }
};

export default function Introduction({ id }:any) {
    const { loading, error, data, refetch }:any = useDataQuery(query, {
        variables: { id }
    });

    useEffect(() => {
        refetch({ id });
    }, [id]);

    const res = data?.dataElementGroups;

    if (loading) {
        return <Loader text={""}/>;
    }
    if (error) {
        return <Error error={error}/>;
    }

    return (<div>
      <h2>{res?.displayName}</h2>
      <h3>{i18n.t("Introduction")} </h3>
      <p>
        {" "}
        {i18n.t("Indicator Group name is  {{variables1}}.", {
            variables1: res?.displayName
        })}
      </p>

      <IdentifiedBy href={res?.href} id={res?.id}/>
    </div>);
}

