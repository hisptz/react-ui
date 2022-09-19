import PropTypes from "prop-types";
import React from "react";

export default function DisplaySourceDataElement(props:any) {
    const title = props.title;
    const data = props.data;

    return (<>
      <ul>
        {data.map((el:any) => {
            return (<li key={el.id}>
              {el.val}
              <ol>
                {el.sources.map((src:any) => {
                    return (<li key={src.dataSet.id}>{src.dataSet.displayName}</li>);
                })}
              </ol>
            </li>);
        })}
      </ul>
    </>);
}

DisplaySourceDataElement.PropTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};

