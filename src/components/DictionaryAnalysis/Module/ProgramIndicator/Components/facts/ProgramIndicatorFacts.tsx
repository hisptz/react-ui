import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import { CircularLoader, DataTable, DataTableToolbar, DataTableHead, TableHead, DataTableBody, TableBody, DataTableFoot, DataTableRow, DataTableCell, DataTableColumnHeader, } from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../Shared/Componets/Loaders/Loader";
import IndicatorGroupRow from "./indicatorGroupRow";
const query = {
    indicatorGroups: {
        resource: "programIndicators",
        id: ({ id }:any) => id,
        params: {
            fields: [
                "programIndicatorGroups[id,code,displayName,programIndicators[id,displayName]]",
            ]
        }
    }
};

export default function ProgramIndicatorFacts({ id }:any) {
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

    if (data?.indicatorGroups?.programIndicatorGroups?.length === 0) {
        return (<p>
        {i18n.t("There are no indicator facts associated with this Program Indicator")}{" "}
      </p>);
    }

    return (<div>
      <h3>{i18n.t("Program Indicator facts")} </h3>

      <p>{i18n.t("Belongs to the following program groups of indicators")} </p>

      <div>
        <DataTable>
          <TableHead>
            <DataTableRow>
              <DataTableColumnHeader>{i18n.t("#")}</DataTableColumnHeader>
              <DataTableColumnHeader>{i18n.t("Name")}</DataTableColumnHeader>
              <DataTableColumnHeader>{i18n.t("Code")}</DataTableColumnHeader>
              <DataTableColumnHeader>
                {i18n.t("Indicators")}
              </DataTableColumnHeader>
            </DataTableRow>
          </TableHead>
          <TableBody>
            {data?.indicatorGroups?.programIndicatorGroups?.map((group:any, index:any) => {
            return (<IndicatorGroupRow key={group?.id} no={index} name={group?.displayName} code={group?.code} indicators={group?.programIndicators}/>);
        })}
          </TableBody>
        </DataTable>
      </div>
    </div>);
}

ProgramIndicatorFacts.prototype = {
    id: PropTypes.string.isRequired
};

