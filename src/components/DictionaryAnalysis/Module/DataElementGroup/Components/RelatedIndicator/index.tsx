import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import React, { useEffect } from "react";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../Shared/Componets/Loaders/Loader";
import RelatedIndicatorTable from "../../../../Shared/Componets/RelatedIndicatorTable";

const query = {
    sources: {
        resource: "dataElementGroups",
        id: ({ id }:any) => id,
        params: {
            fields: ["dataElements[id,displayName]"]
        }
    }
};

export default function RelatedIndicator({ id }:any) {
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
      <h3>{i18n.t("Related Indicators")} </h3>
      <p>
        {i18n.t("The following is the summary of indicators using the data elements in this group")}
      </p>

      <ul>
        {(data?.sources as any)?.dataElements?.map((e:any) => {
            return (<li key={e?.id}>
              <div>
                <b> {e?.displayName} </b>
                <RelatedIndicatorTable id={e?.id}/>
              </div>
            </li>);
        })}
      </ul>
    </div>);
}

