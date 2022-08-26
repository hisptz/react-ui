import { useDataEngine } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import { reduce } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { useGetNumDenMatch } from "../../../Utils/Hooks";
import Error from "../Error/ErrorAPIResult";
import Loader from "../Loaders/Loader";

export default function IndicatorCount({ dataElementsArray }:any) {
    const engine = useDataEngine();

    const onlyIds = dataElementsArray?.map((e:any) => {
        return e?.id;
    });

    const { loading, error, data }:any = useGetNumDenMatch(onlyIds, engine);

    const count = reduce(data?.matches ?? [], function (prev, curr) {
        return (prev + curr?.numeratorMatch?.indicators?.length ??
            0 + curr?.denominatorMatch?.indicators?.length ??
            0);
    }, 0);

    if (loading) {
        return <Loader text={""}/>;
    }
    if (error) {
        return <Error error={error}/>;
    }

    return (<>
      {i18n.t("It\u2019s data elements belongs to {{variables}} indicators using it as numerator/denominator", { variables: count })}
    </>);
}

IndicatorCount.propTypes = {
    dataElementsArray: PropTypes.array.isRequired
};

