import { useDataEngine, useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {IndicatorGroupContext} from "../../../../../../../components/DictionaryAnalysis/Store/IndicatorGroupContext";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react";
import Error from "../../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../../Shared/Componets/Loaders/Loader";
import { useGetDataSet } from "../../../../../Utils/Hooks";

export default function DataSets({ aggregate }: any) {
  const { values, setValues } = useContext(IndicatorGroupContext);

  const dt = aggregate?.map((e: any) => {
    return e.split(".")[0];
  });

  setValues({ ...values, ...{ groupAggregateDataElements: _.concat(values?.aggregateDataElements, dt) } });
 
  const engine = useDataEngine();

  const onlyIds = aggregate?.map((el: any) => {
    return el?.split(".")[0]; //since id may come as with . to indicate with category comb
  });

  const { loading, error, data }: any = useGetDataSet(onlyIds, engine);
  let allDataSets: any[] = [];
  useEffect(() => {
    data?.dataSets?.map((e: any) => {
      e.map((el: any) => {
        allDataSets.push(el);
      });
    });
    allDataSets = _.uniqWith(allDataSets, _.isEqual);

    setValues({ ...values, ...{ groupDataSets: _.concat(values?.dataSets,allDataSets) } });
    
  }, [data]);

  if (loading) {
    return <Loader text={""} />;
  }
  if (error) {
    return <Error error={error} />;
  }

  return (
    <div>
      {i18n.t("Datasets")}
      <ul>
        {allDataSets?.map((datset) => {
          return (
            <li key={datset?.id}>
              {datset?.displayName} {i18n.t(" submitting ")} {datset?.periodType} {i18n.t(" after every ")} {datset?.timelyDays} {i18n.t(" days")}{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

DataSets.propTypes = {
  aggregate: PropTypes.array.isRequired,
};
