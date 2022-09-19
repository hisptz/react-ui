import PropTypes from "prop-types";
import React from "react";

export default function DisplaySourceDataSet({ data }:any) {
    return (<>
      <ul>
        {data?.map((el:any) => {
            return <li key={el.id}> {el?.val} </li>;
        })}
      </ul>
    </>);
}

DisplaySourceDataSet.PropTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};

