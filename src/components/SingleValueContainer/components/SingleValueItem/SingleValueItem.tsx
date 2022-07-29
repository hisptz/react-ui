import React from "react";
import styles from "../../styles/SingleValueContainer.module.css";
import { SingleValue } from "../../types/props";
import SingleValuePercentage from "./SingleValuePercentage";

export default function SingleValueItem({ label, value, color, percentage }: SingleValue): React.ReactElement {
  return (
    <div className={`${styles["single-value-item"]} text-center`}>
      <div className={styles["font-large"]}>{label}</div>
      <div className={`${styles["font-bold"]} ${styles["font-xx-large"]} ${styles["padding-top"]}`}>{value}</div>
      {percentage ? <SingleValuePercentage color={color} percentage={percentage} /> : <span></span>}
    </div>
  );
}
