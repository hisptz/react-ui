import i18n from "@dhis2/d2-i18n";
import {
  DataTable,
  DataTableToolbar,
  DataTableHead,
  TableHead,
  DataTableBody,
  TableBody,
  DataTableFoot,
  DataTableRow,
  DataTableCell,
  DataTableColumnHeader,
} from "@dhis2/ui";
import DictionaryContext from "../../../../../../components/DictionaryAnalysis/Store/DictionaryContext";
import React, { useContext } from "react";
import Row from "./Row";

export default function DatasetsReportingRates() {
  const { values } = useContext(DictionaryContext);
  const dataSetReportingRates = values?.dataSetReportingRates;

  if (dataSetReportingRates?.length === 0) {
    return (
      <div>
        <h3> {i18n.t("Datasets (Reporting rates) in indicator")} </h3>
        <p>{i18n.t("There were no Datasets (Reporting rates) in the Indicator Calculations")} </p>
      </div>
    );
  }

  let i = 0;
  return (
    <div>
      <h3>{i18n.t("Datasets (Reporting rates) in indicator")} </h3>
      <p>{i18n.t("The following is the summary of the datasets (reporting rates) used in calculations:")} </p>
      <DataTable>
        <TableHead>
          <DataTableRow>
            <DataTableColumnHeader bordered>{i18n.t("Dataset")}</DataTableColumnHeader>
            <DataTableColumnHeader bordered>{i18n.t("Description")}</DataTableColumnHeader>
            <DataTableColumnHeader>{i18n.t("Timely Submission")}</DataTableColumnHeader>
            <DataTableColumnHeader>{i18n.t("Expiry days")}</DataTableColumnHeader>
            <DataTableColumnHeader>{i18n.t("Period type")}</DataTableColumnHeader>
            <DataTableColumnHeader>{i18n.t("Assigned orgunits")}</DataTableColumnHeader>
            <DataTableColumnHeader>{i18n.t("Data elements")}</DataTableColumnHeader>
            <DataTableColumnHeader>{i18n.t("Legends")}</DataTableColumnHeader>
          </DataTableRow>
        </TableHead>
        <TableBody>
          {dataSetReportingRates?.map((dataSet: any) => {
            ++i;
            return <Row key={i} dataSet={dataSet} />;
          })}
        </TableBody>
      </DataTable>
    </div>
  );
}
