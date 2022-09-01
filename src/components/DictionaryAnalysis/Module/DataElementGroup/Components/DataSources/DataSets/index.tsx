import { useDataEngine, useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import CountContext from "../../../../../../../components/DictionaryAnalysis/Store/CountContext";
import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react";
// import { useSetRecoilState } from "recoil";
import Error from "../../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../../Shared/Componets/Loaders/Loader";
// import { dataSetDataElementCountState } from "../../../../../Store";
import { useGetDataSet } from "../../../../../Utils/Hooks";

export default function DataSets({ aggregate }:any) {
   // const updateCount = useSetRecoilState(dataSetDataElementCountState);
    const {values,setValues}=useContext(CountContext);
    const engine = useDataEngine();

    const onlyIds = aggregate?.map((el:any) => {
        return el?.id;
    });

    const { loading, error, data } = useGetDataSet(onlyIds, engine);

    const res = (data as any)?.dataSets;
    useEffect(() => {
        let totalCount = 0;
        res?.map((e:any) => {
            totalCount += e?.length;
        });
        setValues({...values,...{dataSetCount:totalCount}});
        return () => { };
    }, [data]);

    if (loading) {
        return <Loader text={""}/>;
    }
    if (error) {
        return <Error error={error}/>;
    }

    return (<div>
      <ul>
        {aggregate?.map((el:any, index:number) => {
            return (<li key={el?.id + index}>
              {el?.displayName}
              <ul>
                {" "}
                {res[index]?.length > 1 ? i18n.t("sources") : ""}
                {res[index]?.map((datset:any) => {
                    return (<li key={datset?.id}>
                      {datset?.displayName} {i18n.t(" submitting ")}{" "}
                      {datset?.periodType} {i18n.t(" after every ")}{" "}
                      {datset?.timelyDays} {i18n.t("days")}{" "}
                    </li>);
                })}
              </ul>
            </li>);
        })}
      </ul>
    </div>);
}

DataSets.propTypes = {
    aggregate: PropTypes.array.isRequired
};

