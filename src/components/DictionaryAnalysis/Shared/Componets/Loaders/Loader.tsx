import { CenteredContent, CircularLoader, colors } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";

export default function Loader({ text }:any) {
    return (<div className="column center" style={{ height: "100%" }}>
      <CenteredContent>
        <div>
          <CircularLoader />
          <p style={{ color: colors.default }}>{text}</p>
        </div>
      </CenteredContent>
    </div>);
}

Loader.propTypes = {
    text: PropTypes.string
};

