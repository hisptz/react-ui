import { useDataEngine } from "@dhis2/app-runtime";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import Error from "../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../Shared/Componets/Loaders/Loader";
import { useGetFunctionsDetails } from "../../Utils/Hooks/FunctionDictionary";
import FunctionPage from "./index";

export default function FunctionPage2({ id }:any) {
    const engine = useDataEngine();
    const functionId = id.split(".")[0];
    const ruleId = id.split(".")[1];
    const { loading, error, data }:any = useGetFunctionsDetails([functionId], engine);

    const ruleObj = _.filter(data[0]?.rules ?? [], (e) => {
        return e?.id === ruleId;
    });

    if (loading) {
        return <Loader text={""}/>;
    }
    if (error) {
        return <Error error={error}/>;
    }

    return <FunctionPage ruleObj={ruleObj[0]} functionObj={data[0]}/>;
}

FunctionPage2.propTypes = {
    id: PropTypes.string.isRequired
};

