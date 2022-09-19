import { DataTableRow, DataTableCell, DataTableColumnHeader, Button, } from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import DisplayList from "./displayList";

export default function IndicatorGroupRow({ no, name, code, indicators }:any) {
    return (<DataTableRow>
      <DataTableCell bordered>{no}</DataTableCell>
      <DataTableCell bordered>{name}</DataTableCell>
      <DataTableCell bordered>{code}</DataTableCell>
      <DataTableCell bordered>
        <DisplayList list={indicators}/>
      </DataTableCell>
    </DataTableRow>);
}

IndicatorGroupRow.propTypes = {
    no: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    indicators: PropTypes.array.isRequired
};

