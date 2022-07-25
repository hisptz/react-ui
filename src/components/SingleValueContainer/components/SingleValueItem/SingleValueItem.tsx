import React from "react";
import { SingleValue } from "../../types/props";
import "../../styles/index.css";
import SingleValuePercentage from "./SingleValuePercentage";

export default function SingleValueItem({ label, value, color, percentage }: SingleValue): React.ReactElement {
  return (
    <div className="single-value-item text-center">
      <div className="font-large">{label}</div>
      <div className="font-bold font-xx-large">{value}</div>
      {percentage ? <SingleValuePercentage color={color} percentage={percentage} /> : <span></span>}
    </div>
  );
}
