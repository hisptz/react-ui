import { Tooltip } from "@dhis2/ui";
import React from "react";
import { VALUE_TYPES } from "../../../FormField/constants";
import styles from "../../styles/SingleValueContainer.module.css";
import { SingleValue } from "../../types/props";
import SingleValuePercentage from "./SingleValuePercentage";

const numberFormatter = (value: number) => Intl.NumberFormat("en", { notation: "compact" }).format(value);

export default function SingleValueItem({ label, value, color, percentage }: SingleValue): React.ReactElement {
  const sanitizedValue = typeof value == "string" ? value : numberFormatter(value);
  return (
    <div className={`${styles["single-value-item"]} text-center`}>
      <div className={styles["font-large"]}>{label}</div>
      <Tooltip content={value}>
        <div className={`${styles["font-bold"]} ${styles["font-xx-large"]} ${styles["padding-top"]}`}>{sanitizedValue}</div>
      </Tooltip>
      {percentage ? <SingleValuePercentage color={color} percentage={percentage} /> : <span></span>}
    </div>
  );
}
