import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {IndicatorGroupContext,IndicatorGroupProvider } from "./../../../../../../components/DictionaryAnalysis/Store/IndicatorGroupContext";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
// import { useSetRecoilState } from "recoil";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../Shared/Componets/Loaders/Loader";
// import { indicatorGroupDenominatorDataElements, indicatorGroupNumeratorDataElements } from "../../../../Store/IndicatorGroup";
import { getFormulaSources } from "../../../../Utils/Functions/FormulaFunctions";
import { dataElementDomainTypes, dataTypesInitials } from "../../../../Utils/Models";
import DataSets from "./DataSets";
import Programs from "./Programs";

const query = {
  sources: {
    resource: "indicatorGroups",
    id: ({ id }: any) => id,
    params: {
      fields: ["indicators[id,displayName,numerator,denominator]"],
    },
  },
};

export default function DataSources({ id }: any) {
  const { loading, error, data, refetch }: any = useDataQuery(query, {
    variables: { id },
  });

  useEffect(() => {
    refetch({ id });
  }, [id]);

  const [result, setResult]: any = useState({});
  const { values, setValues } = useContext(IndicatorGroupContext);
  // const updateNum = useSetRecoilState(indicatorGroupNumeratorDataElements);
  // const updateDen = useSetRecoilState(indicatorGroupDenominatorDataElements);

  useEffect(() => {
    let numeratorDataElement;
    let denominatorDataElement;
    let numeratorProgramDtElement;
    let denominatorProgramDtElement;

    //for each indicator, put dataElements from both numerator and den in one array them pass in it
    const sourcesDataElement = data?.sources?.indicators?.map((e: any) => {
      numeratorDataElement = getFormulaSources(e?.numerator, dataTypesInitials.DATA_ELEMENT);
      denominatorDataElement = getFormulaSources(e?.denominator, dataTypesInitials.DATA_ELEMENT);

      return [...numeratorDataElement, ...denominatorDataElement];
    });

    const sourceProgram = data?.sources?.indicators?.map((e: any) => {
      numeratorProgramDtElement = getFormulaSources(e?.numerator, dataTypesInitials.PROGRAM_DATA_ELEMENT);
      denominatorProgramDtElement = getFormulaSources(e?.denominator, dataTypesInitials.PROGRAM_DATA_ELEMENT);
      const ind = _.concat(
        [],
        getFormulaSources(e?.numerator, dataTypesInitials.PROGRAM_INDICATOR),
        getFormulaSources(e?.denominator, dataTypesInitials.PROGRAM_INDICATOR)
      );
      const attr = _.concat([], getFormulaSources(e?.numerator, dataTypesInitials.ATTRIBUTES), getFormulaSources(e?.denominator, dataTypesInitials.ATTRIBUTES));
      const prgDtEl = [...numeratorProgramDtElement, ...denominatorProgramDtElement];
      return { prgInd: ind, attr: attr, prgDtEl: prgDtEl };
    });

    setResult({
      sourcesDataElement: sourcesDataElement,
      sourceProgram: sourceProgram,
    });

    setValues({
      numerator: {
        aggregate: numeratorDataElement,
        tracker: numeratorProgramDtElement,
      },
      denominator: {
        aggregate: denominatorDataElement,
        tracker: denominatorProgramDtElement,
      },
    });
    //for related indicator
    // updateNum({
    //   aggregate: numeratorDataElement,
    //   tracker: numeratorProgramDtElement,
    // });
    // updateDen({
    //   aggregate: denominatorDataElement,
    //   tracker: denominatorProgramDtElement,
    // });
  }, [data]);

  if (loading) {
    return <Loader text={""} />;
  }
  if (error) {
    return <Error error={error} />;
  }

  return (
    <div>
      <h3>{i18n.t("Data sources (Datasets/Programs)")} </h3>
      <p> {i18n.t("Indicators in this group are captured from the following sources")} </p>

      <ul>
        {result.sourcesDataElement
          ? data?.sources?.indicators?.map((e: any, index: any) => {
              return (
                <li>
                  <b> {e?.displayName} </b>

                  <IndicatorGroupProvider value={{ values, setValues }}>
                    <DataSets aggregate={result?.sourcesDataElement[index] ?? []} />
                    <Programs sources={result?.sourceProgram[index]} />
                  </IndicatorGroupProvider>
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
}

DataSources.propTypes = {
  id: PropTypes.string.isRequired,
};
