import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import React, { useEffect } from "react";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../Shared/Componets/Loaders/Loader";
import { lowerCaseAllWordsExceptFirstLetters } from "../../../../Utils/Functions/FormulaFunctions";
import { analyticsTypes } from "../../../../Utils/Models";
import BoundaryTable from "./Components/BoundaryTable/BoundaryTable";
import ExpressionDetailTable from "./Components/ExpressionDetailTable";

const query = {
    calculation: {
        resource: "programIndicators",
        id: ({ id }:any) => id,
        params: {
            fields: [
                "analyticsType",
                "aggregationType",
                "expression",
                "filter",
                "analyticsPeriodBoundaries[id,boundaryTarget,analyticsPeriodBoundaryType,offsetPeriods,offsetPeriodType]",
            ]
        }
    }
};

export default function CalculationDetails({ id }:any) {
    const { loading, error, data, refetch }:any = useDataQuery(query, {
        variables: { id }
    });

    useEffect(() => {
        refetch({ id });
    }, [id]);

    if (loading) {
        return <Loader text={""}/>;
    }
    if (error) {
        return <Error error={error}/>;
    }

    const res = data?.calculation;

    return (<div>
      <h3>{i18n.t(" Calculation details")}</h3>
      <p>
        {i18n.t("Calculation of the values will be {{variables}} of {{variables2}} across orgunit and period.", {
            variables: res?.aggregationType,
            variables2: res?.analyticsType
        })}
      </p>
      <p>
        {i18n.t("Program indicator calculation will be based on Analytics Type, for distinction purposes:")}
      </p>

      <ul>
        {res?.analyticsType === analyticsTypes.EVENT ? (<li>
            {i18n.t(" Events implies, each event from data source is considered as independent row to be counted, and properties and details of the event are used to filter events.")}
          </li>) : res?.analyticsType === analyticsTypes.ENROLLMENT ? (<li>
            {i18n.t("Enrollment implies, each enrollment from data source is considered as independent row to be counted, and events from any stage and other properties and details of enrollment are used to filter enrollments.")}
          </li>) : ("")}
      </ul>
      <div>
        <p>
          {i18n.t("Below are expression details on computing program indicator and it\u2019s related data source")}
        </p>
      </div>
      <div>
        <ExpressionDetailTable expression={res?.expression} filter={res?.filter}/>
      </div>

      <div>
        <p>
          {i18n.t("Below are period boundaries that determines which {{variables}} will be included in calculations of the program indicators, where for", {
            variables: lowerCaseAllWordsExceptFirstLetters(res?.analyticsType)
        })}
          {res?.analyticsType === analyticsTypes.EVENT
            ? i18n.t(" event date will be used.")
            : res?.analyticsType === analyticsTypes.ENROLLMENT
                ? i18n.t("enrollment analytics will be used.")
                : ""}
        </p>
      </div>
      <div>
        <BoundaryTable rows={res?.analyticsPeriodBoundaries}/>
      </div>
    </div>);
}

