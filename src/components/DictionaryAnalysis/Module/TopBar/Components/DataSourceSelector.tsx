import { useDataEngine } from "@dhis2/app-runtime";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
// import { useRecoilCallback } from "recoil";
//import { dataElementsStateDictionary, dataSetDataElementCountState, dataSetReportingRatesStateDictionary, programDataElementCountState, programIndicatorStateDictionary, } from "../../../Store";
import { indicatorGroupAggregateDataElements, indicatorGroupDataSets, indicatorGroupDenominatorDataElements, indicatorGroupNumeratorDataElements, indicatorGroupProgramDataElements, indicatorGroupPrograms, } from "../../../Store/IndicatorGroup";
import { dataSourceTypes } from "../../../Utils/Models";
import DataElementPage from "../../DataElement";
import DataElementGroupPage from "../../DataElementGroup";
import FunctionPage2 from "../../Function/index2";
import Index from "../../Indicator/Index";
import IndicatorGroupPage from "../../IndicatorGroup";
import ProgramIndicatorPage from "../../ProgramIndicator";
import ModalLoader from "../../Loaders/ModalLoader";
import { getDataSourceType } from "core/utils/dataSource";

export default function DataSourceSelector({ type, id }:any) {
    const engine = useDataEngine();
    // const reset = useRecoilCallback(({ reset }:any) => () => {
    //     reset(dataElementsStateDictionary);
    //     reset(dataSetReportingRatesStateDictionary);
    //     reset(programIndicatorStateDictionary);
    //     reset(dataSetDataElementCountState);
    //     reset(programDataElementCountState);
    //     reset(indicatorGroupDataSets);
    //     reset(indicatorGroupPrograms);
    //     reset(indicatorGroupProgramDataElements);
    //     reset(indicatorGroupAggregateDataElements);
    //     reset(indicatorGroupNumeratorDataElements);
    //     reset(indicatorGroupDenominatorDataElements);
    // });
    const [dataType, setDataType] = useState(type);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getType() {
            setLoading(true);
            try {
                setDataType(await getDataSourceType(engine, id));
            }
            catch (e) {
                console.error(e);
            }
            finally {
                setLoading(false);
            }
        }

        getType();
    }, [engine, id]);


    // useEffect(() => {
    //     return () => {
    //         reset();
    //     };
    // }, [id]);

    
    if (loading) {
        return <ModalLoader />;
    }

    if (dataType === dataSourceTypes.INDICATOR) {
        return <Index id={id}/>;
    }
    if (dataType === dataSourceTypes.DATA_ELEMENT) {
        return <DataElementPage id={id}/>;
    }
    if (dataType === dataSourceTypes.PROGRAM_DATA_ELEMENT) {
        return <DataElementPage id={id}/>;
    }
    if (dataType === dataSourceTypes.PROGRAM_INDICATOR) {
        return <ProgramIndicatorPage id={id}/>;
    }
    if (dataType === dataSourceTypes.DATA_ELEMENT_GROUP) {
        return <DataElementGroupPage id={id}/>;
    }
    if (dataType === dataSourceTypes.INDICATOR_GROUP) {
        return <IndicatorGroupPage id={id}/>;
    }
    if (dataType === dataSourceTypes.FUNCTION) {
        return <FunctionPage2 id={id}/>;
    }
    return null;
}

DataSourceSelector.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(dataSourceTypes)).isRequired
};

