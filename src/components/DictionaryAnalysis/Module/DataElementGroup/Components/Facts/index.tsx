import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import CountContext from "components/DictionaryAnalysis/Store/CountContext";
import React, { useContext, useEffect } from "react";
// import { useRecoilValue } from "recoil";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import IndicatorCount from "../../../../Shared/Componets/IndicatorCount";
import Loader from "../../../../Shared/Componets/Loaders/Loader";
//  import { dataSetDataElementCountState, programDataElementCountState, } from "../../../../Store";

const query = {
    sources: {
        resource: "dataElementGroups",
        id: ({ id }:any) => id,
        params: {
            fields: ["dataElements"]
        }
    }
};

export default function Facts({ id }:any) {
    const { loading, error, data, refetch } = useDataQuery(query, {
        variables: { id }
    });
       const  {values} =  useContext(CountContext);
    // const dataSetCount = useRecoilValue(dataSetDataElementCountState);
    // const programCount = useRecoilValue(programDataElementCountState);

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
      <h3>{i18n.t(" Data element group Facts")}</h3>

      <ul>
        <li>
          {" "}
          {i18n.t("It has {{variables}} data Elements", {
            variables: (data?.sources as any)?.dataElements?.length
        })}
        </li>
        <li>
          {" "}
          {i18n.t("It\u2019s data elements belongs to {{variables}} dataset and {{variables2}} program sources of data", {
            variables: values?.dataSetCount,
            variables2: values?.programCount
        })}
        </li>
        <li>
          <IndicatorCount dataElementsArray={(data?.sources as any)?.dataElements}/>{" "}
        </li>
      </ul>
    </div>);
}

