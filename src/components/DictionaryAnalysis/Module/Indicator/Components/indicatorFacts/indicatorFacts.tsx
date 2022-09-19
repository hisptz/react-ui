import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import { DataTable, TableHead, DataTableBody, TableBody, DataTableFoot, DataTableRow, DataTableCell, DataTableColumnHeader, CircularLoader, } from "@dhis2/ui";
import propTypes from "prop-types";
import React, { useEffect } from "react";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../Shared/Componets/Loaders/Loader";
import IndicatorGroupRow from "./indicatorGroupRow";

const query = {
    indicatorGroups: {
        resource: "indicators",
        id: ({ id }:any) => id,
        params: {
            fields: ["indicatorGroups[id,displayName,indicators[id,displayName]]"]
        }
    }
};

export default function IndicatorFacts({ id }:any) {
    const { loading, error, data, refetch }:any = useDataQuery(query, {
        variables: { id }
    });

    useEffect(() => {
        refetch({ id });
    }, [id]);

    if (loading) {
        return <Loader />;
    }
    if (error) {
        return <Error error={error}/>;
    }

    if (data?.indicatorGroups?.indicatorGroups) {
        return (<p>
        {i18n.t(" There are no indicator facts associated with this indicator")}
      </p>);
    }

    let count = 0;
    return (<div>
      <h3>{i18n.t("Indicator facts")}</h3>

      <p>{i18n.t("Belongs to the following groups of indicators")}</p>

      <div>
        <DataTable>
          <TableHead>
            <DataTableRow>
              <DataTableColumnHeader>#</DataTableColumnHeader>
              <DataTableColumnHeader>{i18n.t("Name")}</DataTableColumnHeader>
              <DataTableColumnHeader>{i18n.t("Code")}</DataTableColumnHeader>
              <DataTableColumnHeader>
                {i18n.t("Indicators")}
              </DataTableColumnHeader>
            </DataTableRow>
          </TableHead>
          <TableBody>
            {data?.indicatorGroups?.indicatorGroups?.map((group:any) => {
            count++;
            return (<IndicatorGroupRow key={group?.id} no={count} name={group?.displayName} code={group?.id} indicators={group?.indicators}/>);
        })}
          </TableBody>
        </DataTable>
      </div>
    </div>);
}

IndicatorFacts.PropTypes = {
    id: propTypes.string.isRequired
};

