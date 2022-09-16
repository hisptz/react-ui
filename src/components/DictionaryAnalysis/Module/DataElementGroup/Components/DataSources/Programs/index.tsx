import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import CountContext from "../../../../../../../components/DictionaryAnalysis/Store/CountContext";
import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react";
import Error from "../../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../../Shared/Componets/Loaders/Loader";

const query = {
    programs: {
        resource: "programStages",
        params: ({ dataElementId }:any) => ({
            fields: ["program[id,displayName]"],
            filter: [`programStageDataElements.dataElement.id:eq:${dataElementId}`]
        })
    }
};

export default function Programs({ id, name }:any) {
    const dataElementId = id;
    const {values,setValues}=useContext(CountContext);

    const { loading, error, data, refetch } = useDataQuery(query, {
        variables: { dataElementId }
    });

    useEffect(() => {
        refetch({ id });
    }, [id]);

    useEffect(() => {
        setValues({...values,...{programCount:values?.programCount+(data?.programs as any)?.programStages?.length}});
        
    }, [data]);

    if (loading) {
        return <Loader text={""}/>;
    }
    if (error) {
        return <Error error={error}/>;
    }

    return (<div>
      {name}
      <ul>
        {(data?.programs as any)?.programStages?.map((dt:any) => {
            return (<li key={dt?.program?.id}>
              <b>{dt?.program?.displayName}</b>{" "}
              {i18n.t("submitting records on every event(case or individual)")}
            </li>);
        })}
      </ul>
    </div>);
}

Programs.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

