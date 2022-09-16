import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import { DataTable, DataTableToolbar, DataTableHead, TableHead, DataTableBody, TableBody, DataTableRow, DataTableColumnHeader, } from "@dhis2/ui";
import {IndicatorGroupContext} from "./../../../../../../components/DictionaryAnalysis/Store/IndicatorGroupContext";
import React, { useContext, useEffect } from "react";
import RowAggregate from "./Components/RowAggregate";
import RowTracker from "./Components/RowTracker";

const query = {
    sources: {
        resource: "dataElementGroups",
        id: ({ id }:any) => id,
        params: {
            fields: ["dataElements[id,displayName]"]
        }
    }
};

export default function RelatedDataElements() {
  const {values}= useContext(IndicatorGroupContext);
    const {numerator,denominator}=values as any;

    return (<div>
      <h3>{i18n.t("Related Data elements")} </h3>
      <p>
        {i18n.t("The following is the summary of the data elements used in the group")}
      </p>

      <DataTable>
        <TableHead>
          <DataTableRow>
            <DataTableColumnHeader bordered>
              {i18n.t("Data Element")}
            </DataTableColumnHeader>
            <DataTableColumnHeader bordered>
              {i18n.t("Expression part (Numerator/ Denominator)")}
            </DataTableColumnHeader>
            <DataTableColumnHeader>
              {i18n.t("Value Type")}
            </DataTableColumnHeader>
            <DataTableColumnHeader>
              {i18n.t("Zero Significance")}
            </DataTableColumnHeader>
            <DataTableColumnHeader>
              {i18n.t("Categories")}
            </DataTableColumnHeader>
            <DataTableColumnHeader>
              {i18n.t("Datasets/ Programs")}
            </DataTableColumnHeader>
            <DataTableColumnHeader>{i18n.t("Groups")}</DataTableColumnHeader>
          </DataTableRow>
        </TableHead>
        <TableBody>
          {numerator?.aggregate?.map((e:any) => {
            return <RowAggregate key={e} id={e} location={"numerator"}/>;
        })}
          {numerator?.tracker?.map((e:any) => {
            return <RowTracker key={e} id={e} location={"numerator"}/>;
        })}
          {denominator?.aggregate?.map((e:any) => {
            return <RowAggregate key={e} id={e} location={"denominator"}/>;
        })}
          {denominator?.tracker?.map((e:any) => {
            return <RowTracker key={e} id={e} location={"denominator"}/>;
        })}
        </TableBody>
      </DataTable>
    </div>);
}

