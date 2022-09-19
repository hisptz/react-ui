import { CenteredContent, CircularLoader } from "@dhis2/ui";
import React from "react";

export default function ModalLoader() {
  return (
    <div className="w-100 h-100">
      <CenteredContent>
        <CircularLoader small />
      </CenteredContent>
    </div>
  );
}
