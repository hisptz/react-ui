import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import React, { useEffect } from "react";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../Shared/Componets/Loaders/Loader";
import Legend from "./legend";

const query = {
    legendAnalysis: {
        resource: "programIndicators",
        id: ({ id }:any) => id,
        params: {
            fields: [
                "id",
                "displayName",
                "legendSets[id,displayName,legends[id,displayName,startValue,endValue,color]]",
            ]
        }
    }
};

export default function LegendsAnalysis({ id }:any) {
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

    if (data?.legendAnalysis?.legendSets?.length === 0) {
        return (<>
        <p>
          {i18n.t("There are no legends associated with these Program Indicator")}{" "}
        </p>
      </>); //no legends sets
    }

    const legendSet = data?.legendAnalysis?.legendSets;

    return (<div>
      <h3>{i18n.t("Legends for analysis")} </h3>
      <p>
        {i18n.t("Uses {{variables}} legends for for analysis, spread across multiple cut-off points of interest, existing legends are:", { variables: legendSet?.length })}
      </p>
      <ul>
        {legendSet?.map((legendSet:any) => {
            return <Legend key={legendSet?.id} legendSet={legendSet}/>;
        })}
      </ul>
    </div>);
}

