// eslint-disable-next-line import/no-unresolved
import { CenteredContent, CircularLoader, colors } from "@dhis2/ui";
import React from "react";

export default function FullPageLoader({ text, ...props }: any) {
  return (
    <div className="column center" style={{ height: "100%", width: "100%" }}>
      <CenteredContent>
        <div>
          <CircularLoader {...props} />
          <p style={{ color: colors.default }}>{text}</p>
        </div>
      </CenteredContent>
    </div>
  );
}
