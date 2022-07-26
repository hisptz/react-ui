import { LinearLoader } from "@dhis2/ui";
import React from "react";

export default function SingleValuePercentage({ percentage, color }: any): React.ReactElement {
  const width = "100%";
  return (
    <div className="w-100">
      <LinearLoader width={width} amount={percentage} />
    </div>
  );
}
