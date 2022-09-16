import { useDataEngine, useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader, DataTableCell } from "@dhis2/ui";
import DictionaryContext from "../../../../../../../../components/DictionaryAnalysis/Store/DictionaryContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import Error from "../../../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../../../Shared/Componets/Loaders/Loader";
import { getFinalWordFormula } from "../../../../../../Utils/Functions/FormulaFunctions";
import { useGetFormulaDataDetailed } from "../../../../../../Utils/Hooks/Indicator";
import classes from "./Components/DataSourceCellStyle.module.css";
import DisplaySourceDataElement from "./Components/DisplaySourceDataElement";
import DisplaySourceDataSet from "./Components/DisplaySourceDataSet";
import DisplaySourceProgramDataElementOrAttribute from "./Components/DisplaySourceProgramDataElementOrAttribute";
import DisplaySourceProgramIndicator from "./Components/DisplaySourceProgramIndicator";

export default function CalculationDetailRow({ formula, location, ...props }: any) {
  //hooks
  const engine = useDataEngine();

  const { setValues } = useContext(DictionaryContext);
  const { loading, error, data }: any = useGetFormulaDataDetailed(formula, engine, location);

  if (loading) {
    return <Loader text={""} />;
  }
  if (error) {
    return <Error error={error} />;
  }
 console.log("data",data);
  // for store
  setValues(data);

  return (
    <>
      <DataTableCell bordered width={"50%"}>
        {getFinalWordFormula(
          formula,
          data?.dataElements,
          data?.programIndicators,
          data?.dataSetReportingRates,
          data?.attributes,
          data?.constants,
          data?.programDtElement,
          data?.orgUnitCount
        )}
      </DataTableCell>
      <DataTableCell bordered>
        <div className={classes.sources}>
          {data?.dataElements?.length > 0 ? <DisplaySourceDataElement title={"Data Elements"} data={data?.dataElements} /> : ""}
          {data?.dataSetReportingRates?.length > 0 ? <DisplaySourceDataSet title={"Data Sets"} data={data?.dataSetReportingRates} /> : ""}
          {data?.programIndicators?.length > 0 ? <DisplaySourceProgramIndicator title={"Program Indicators"} data={data?.programIndicators} /> : ""}
          {data?.programDtElement?.length > 0 ? (
            <DisplaySourceProgramDataElementOrAttribute title={"Tracker Data Element"} data={data?.programDtElement} />
          ) : (
            ""
          )}
          {data?.attributes?.length > 0 ? <DisplaySourceProgramDataElementOrAttribute title={"Tracker Data Element"} data={data?.attributes} /> : ""}
        </div>
      </DataTableCell>
    </>
  );
}

CalculationDetailRow.propTypes = {
  formula: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};
