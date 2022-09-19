import { useDataQuery } from "@dhis2/app-runtime";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../Shared/Componets/Loaders/Loader";
import { dataElementDomainTypes } from "../../../../Utils/Models";
import DataSets from "./Components/DataSets";
import OtherDetailTable from "./Components/OtherDetails";
import Programs from "./Components/Programs";

const query = {
    sources: {
        resource: "dataElements",
        id: ({ id }:any) => id,
        params: {
            fields: [
                "domainType",
                "style",
                "optionSetValue",
                "commentOptionSet[displayName]",
                "legendSets[id,displayName]",
                "aggregationLevels",
            ]
        }
    }
};

export default function DataSource({ id }:any) {
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

    return (<>
      {(data?.sources as any)?.domainType === dataElementDomainTypes.AGGREGATE &&
            (data as any) !== dataElementDomainTypes.UNDEFINED ? (<DataSets id={id}/>) : (<Programs id={id}/>)}

      <div>
        <OtherDetailTable other={data?.sources}/>
      </div>
    </>);
}

DataSource.PropTypes = {
    id: PropTypes.string.isRequired
};

