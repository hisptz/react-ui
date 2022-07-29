import { LinearLoader } from "@dhis2/ui";
import React from "react";
import styles from "../../styles/SingleValueContainer.module.css";

export default function SingleValuePercentage({ percentage, color }: any): React.ReactElement {
  const width = "100%";
  return (
    <div className="w-100">
      <LinearLoader className={styles["percent-value"]} width={width} amount={percentage} />
    </div>
  );
}
