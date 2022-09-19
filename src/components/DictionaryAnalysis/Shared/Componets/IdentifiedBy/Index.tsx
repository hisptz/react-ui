import PropTypes from "prop-types";
import React from "react";

export default function IdentifiedBy({ href, id }:any) {
    return (<div>
      Identified by:{" "}
      <i>
        {" "}
        <a style={{ textDecoration: "none" }} href={href + ".json"} target={"_blank"} rel="noreferrer">
          {id}
        </a>{" "}
      </i>
    </div>);
}

IdentifiedBy.PropTypes = {
    id: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
};

