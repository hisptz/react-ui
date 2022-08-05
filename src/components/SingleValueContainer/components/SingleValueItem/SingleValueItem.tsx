import { Tooltip } from "@dhis2/ui";
import { capitalize } from "lodash";
import React from "react";
import { animated, useSpring } from "react-spring";
import styles from "../../styles/SingleValueContainer.module.css";
import { SingleValue } from "../../types/props";
import SingleValuePercentage from "./SingleValuePercentage";

interface SingleValueProps extends SingleValue {
  globalAnimationDelay?: number;
  globalAnimationDuration?: number;
}

export default function SingleValueItem({
  label,
  value,
  color,
  percentage,
  animationDuration,
  animationDelay,
  globalAnimationDelay,
  decimalPlaces,
  globalAnimationDuration,
}: SingleValueProps): React.ReactElement {
  const numberFormatter = (value: number) => Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: decimalPlaces ?? 1 }).format(value);

  const sanitizedValue = useSpring({
    val: value,
    from: { val: 0 },
    config: { duration: animationDuration ?? globalAnimationDuration ?? 1000 },
    delay: animationDelay ?? globalAnimationDelay ?? 10,
  });

  const tooltipContent = `${label}: ${value}`;
  return (
    <div className={`${styles["single-value-item"]} text-center`}>
      <div className={styles["font-large"]}>{label}</div>
      <Tooltip content={capitalize(tooltipContent)}>
        <animated.div className={`${styles["font-bold"]} ${styles["font-xx-large"]} ${styles["padding-top"]}`}>
          {sanitizedValue.val.to((value) => numberFormatter(Math.floor(value)))}
        </animated.div>
      </Tooltip>
      {percentage ? <SingleValuePercentage color={color} percentage={percentage} /> : <span></span>}
    </div>
  );
}
