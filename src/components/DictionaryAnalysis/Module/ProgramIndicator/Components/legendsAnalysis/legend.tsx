import i18n from "@dhis2/d2-i18n";
import { DataTable, DataTableToolbar, DataTableHead, TableHead, DataTableBody, TableBody, DataTableFoot, DataTableRow, DataTableCell, DataTableColumnHeader, } from "@dhis2/ui";

export default function Legend(props:any) {
    const legendSet = props?.legendSet;

    return (<li key={legendSet?.id}>
      <p>
        {legendSet?.displayName} spread accross {legendSet?.legends?.length}{" "}
        classes of for analysis
      </p>

      <div>
        <DataTable>
          <TableHead>
            <DataTableRow>
              <DataTableColumnHeader>{i18n.t("Class")}</DataTableColumnHeader>
              <DataTableColumnHeader>{i18n.t("Upper")}</DataTableColumnHeader>
              <DataTableColumnHeader>{i18n.t("Lower")}</DataTableColumnHeader>
              <DataTableColumnHeader>{i18n.t("Color")}</DataTableColumnHeader>
            </DataTableRow>
          </TableHead>
          <TableBody>
            {legendSet?.legends.map((legend:any) => {
            return (<DataTableRow key={legend.id}>
                  <DataTableCell bordered>{legend?.displayName}</DataTableCell>
                  <DataTableCell bordered>{legend?.endValue}</DataTableCell>
                  <DataTableCell bordered>{legend?.startValue}</DataTableCell>
                  <td style={{
                    background: legend?.color
                }}></td>
                </DataTableRow>);
        })}
          </TableBody>
        </DataTable>
      </div>
    </li>);
}

