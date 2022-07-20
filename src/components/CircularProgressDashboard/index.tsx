import { colors } from "@dhis2/ui";
import React, { useMemo } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { CircularDashboardProps } from "./types/props";

export default function CircularProgressDashboard({ numerator, size, denominator, value, textStyle, strokeStyle }: CircularDashboardProps): React.ReactElement {
  const filledSectionFieldsPercentage = useMemo(() => {
    return value !== undefined ? value : Math.floor(((numerator ?? 0) / (denominator ?? 1)) * 100);
  }, [numerator, denominator, value]);
  return (
    <div
      style={{
        backgroundColor: "transparent",
        width: size,
      }}>
      <CircularProgressbarWithChildren
        styles={{
          path: {
            stroke: strokeStyle?.color ?? colors.blue700,
          },
        }}
        strokeWidth={7}
        value={filledSectionFieldsPercentage}>
        <div
          style={{
            ...(textStyle ?? {}),
            fontSize: textStyle?.fontSize ?? typeof size === "number" ? 0.3 * (size as number) : "100%",
            marginTop: -11,
          }}>
          <strong style={{ color: textStyle?.color ?? strokeStyle?.color ?? colors.blue700 }}>{filledSectionFieldsPercentage}%</strong>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}
