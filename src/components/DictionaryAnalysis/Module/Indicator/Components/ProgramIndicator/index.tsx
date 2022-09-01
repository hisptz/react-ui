import i18n from "@dhis2/d2-i18n";
import { DataTable, TableHead, TableBody, DataTableRow, DataTableColumnHeader, } from "@dhis2/ui";
import DictionaryContext from "../../../../../../components/DictionaryAnalysis/Store/DictionaryContext";
import { useContext } from "react";
//import { useRecoilValue } from "recoil";
// import { programIndicatorStateDictionary } from "../../../../Store";
import Row from "./Row";

export default function ProgramIndicatorIndicator() {
  //  const programIndicators = useRecoilValue(programIndicatorStateDictionary);

    const {values}= useContext(DictionaryContext);

    const {programIndicators}=values as any;

    if (programIndicators.length === 0) {
        return (<div>
        <h3>{i18n.t("Program Indicators in indicator")} </h3>
        <p>
          {i18n.t("There were no Program Indicators in the Indicator Calculations")}{" "}
        </p>
      </div>);
    }

    let i = 0;

    return (<div>
      <h3>{i18n.t("Program Indicators in indicator")} </h3>
      <p>
        {i18n.t("The following is the summary of the program indicators used in calculations:")}{" "}
      </p>

      <DataTable>
        <TableHead>
          <DataTableRow>
            <DataTableColumnHeader bordered>
              {i18n.t("Program Indicator")}
            </DataTableColumnHeader>
            <DataTableColumnHeader bordered>
              {i18n.t("Expression part")}
            </DataTableColumnHeader>
            <DataTableColumnHeader>{i18n.t("Filter")}</DataTableColumnHeader>
            <DataTableColumnHeader>
              {i18n.t("Aggregation type")}
            </DataTableColumnHeader>
            <DataTableColumnHeader>
              {i18n.t("Analytics type")}
            </DataTableColumnHeader>
            <DataTableColumnHeader>
              {i18n.t("Period boundaries")}
            </DataTableColumnHeader>
            <DataTableColumnHeader>{i18n.t("Legends")}</DataTableColumnHeader>
            <DataTableColumnHeader>{i18n.t("Groups")}</DataTableColumnHeader>
          </DataTableRow>
        </TableHead>
        <TableBody>
          {programIndicators.map((programInd:any) => {
            ++i;
            return <Row key={i} programInd={programInd}/>;
        })}
        </TableBody>
      </DataTable>
    </div>);
}

