// eslint-disable-next-line import/no-unresolved
import { CenteredContent, CircularLoader, colors } from "@dhis2/ui";
import React from "react";

export default function FullPageLoader({ text }:any) {
  return (
    <div className="column center" style={{ height: "100%" }}>
      <CenteredContent>
        <div>
          <CircularLoader />
          <p style={{ color: colors.default }}>{text}</p>
        </div>
      </CenteredContent>
    </div>
  );
}

