import { useDataEngine, useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import Error from "../../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../../Shared/Componets/Loaders/Loader";
import { indicatorGroupProgramDataElements, indicatorGroupPrograms, } from "../../../../../Store/IndicatorGroup";
import { useGetIndicatorProgramSource } from "../../../../../Utils/Hooks/DataSource";

export default function Programs({ sources }:any) {
    const engine = useDataEngine();

    const updatePrograms = useSetRecoilState(indicatorGroupPrograms);
    const updateProgramDataElements = useSetRecoilState(indicatorGroupProgramDataElements);

    const { loading, error, data }:any = useGetIndicatorProgramSource(sources, engine);
    let res = [];
    let allProgram:any[] = [];
    useEffect(() => {
        updateProgramDataElements((prev:any) => {
            return _.concat(prev, sources?.prgDtEl);
        });

        res = _.concat([], data?.attr ?? [], data?.prgInd ?? [], data?.prgDtEl ?? []);
        allProgram = _.uniqWith(res, _.isEqual);

        //updating count its used in the facts component
        updatePrograms((prev:any) => {
            return _.concat(prev, allProgram);
        });
    }, [data]);

    if (loading) {
        return <Loader text={""}/>;
    }
    if (error) {
        return <Error error={error}/>;
    }

    if (res?.length > 0) {
        return (<div>
        Programs
        <ul>
          {allProgram?.map((dt, index) => {
                return (<li key={index}>
                <b>{dt?.displayName}</b>{" "}
                {i18n.t("submitting records on every event(case or individual)")}{" "}
              </li>);
            })}
        </ul>
      </div>);
    }
    else {
        return <></>;
    }
}

