import { useDataEngine, useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import { IndicatorGroupContext } from "../../../../../../../components/DictionaryAnalysis/Store/IndicatorGroupContext";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react";
import Error from "../../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../../Shared/Componets/Loaders/Loader";

import { useGetIndicatorProgramSource } from "../../../../../Utils/Hooks/DataSource";

export default function Programs({ sources }: any) {
  const engine = useDataEngine();

  const { values, setValues } = useContext(IndicatorGroupContext);

  const { loading, error, data }: any = useGetIndicatorProgramSource(sources, engine);
  let res = [];
  let allProgram: any[] = [];
  useEffect(() => {
    setValues({ ...values, ...{ programDataElements: _.concat(values?.programDataElements, sources?.prgDtEl) } });

    res = _.concat([], data?.attr ?? [], data?.prgInd ?? [], data?.prgDtEl ?? []);
    allProgram = _.uniqWith(res, _.isEqual);

    setValues({ ...values, ...{ programs: _.concat(values?.programs, allProgram) } });
  }, [data]);

  if (loading) {
    return <Loader text={""} />;
  }
  if (error) {
    return <Error error={error} />;
  }

  if (res?.length > 0) {
    return (
      <div>
        Programs
        <ul>
          {allProgram?.map((dt, index) => {
            return (
              <li key={index}>
                <b>{dt?.displayName}</b> {i18n.t("submitting records on every event(case or individual)")}{" "}
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return <></>;
  }
}
