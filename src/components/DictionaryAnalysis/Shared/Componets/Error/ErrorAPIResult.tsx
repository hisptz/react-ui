import { CenteredContent, colors } from "@dhis2/ui";
import ErrorIcon from "@material-ui/icons/Error";
import PropTypes from "prop-types";
import React from "react";

export default function Error({ error }:any) {
    return (<div className="column center " style={{ height: "100%", textAlign: "center" }}>
      <CenteredContent>
        <div>
          <ErrorIcon style={{ color: colors.grey500, fontSize: 48 }} fontSize="large"/>
          <p style={{ color: colors.grey900 }}>
            {typeof error === "string"
            ? error
            : error?.message ?? error?.details ?? error?.toString()}
          </p>
        </div>
      </CenteredContent>
    </div>);
}

Error.propTypes = {
    error: PropTypes.any
};

