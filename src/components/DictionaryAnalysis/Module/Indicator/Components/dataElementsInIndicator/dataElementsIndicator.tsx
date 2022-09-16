import i18n from "@dhis2/d2-i18n";
import { DataTable, DataTableColumnHeader, DataTableRow, TableBody, TableHead, } from "@dhis2/ui";
import DictionaryContext from "../../../../../../components/DictionaryAnalysis/Store/DictionaryContext";
import React, { useContext } from "react";
import Row from "./row";

export default function DataElementSIndicator() {

    const {values} =useContext(DictionaryContext);

    const dataElements =values?.dataElements;
    if (dataElements?.length === 0) {
        return (<div>
        <h3> {i18n.t("Data elements in indicator")} </h3>
        <p>
          {i18n.t("There were no Data Elements in the Indicator Calculations")}{" "}
        </p>
      </div>);
    }

    let i = 0;
    return (<div>
      <h3>{i18n.t("Data elements in indicator")} </h3>
      <p>
        {" "}
        {i18n.t("The following is the summary of the data elements used in calculations:")}{" "}
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
          {dataElements?.map((dtEle:any) => {
            i++;
            return <Row key={i} datEl={dtEle}/>;
        })}
        </TableBody>
      </DataTable>
    </div>);
}

