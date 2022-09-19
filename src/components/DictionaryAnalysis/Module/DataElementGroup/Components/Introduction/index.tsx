import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import React, { useEffect } from "react";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import IdentifiedBy from "../../../../Shared/Componets/IdentifiedBy/Index";
import Loader from "../../../../Shared/Componets/Loaders/Loader";

const query = {
    dataElementGroups: {
        resource: "dataElementGroups",
        id: ({ id }:any) => id,
        params: {
            fields: [
                "id",
                "displayName",
                "displayDescription",
                "displayShortName",
                "code",
                "href",
            ]
        }
    }
};

export default function Introduction({ id }:any) {
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

    const res = data?.dataElementGroups as any;

    return (<div>
      <h2>{res?.displayName}</h2>
      <h3>{i18n.t("Introduction")} </h3>
      <p>
        {" "}
        {i18n.t("{{variables1}}  can be described as {{variables2}}.\n" +
            "            It\u2019s labelled in short as {{variables3}} and has a code of {{variables4}}.", {
            variables1: res?.displayName,
            variables2: res?.displayDescription,
            variables3: res?.displayShortName,
            variables4: res?.code
        })}
      </p>

      <IdentifiedBy href={res?.href} id={res?.id}/>
    </div>);
}

