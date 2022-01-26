import { IconClock16, Tag } from "@dhis2/ui";
import React from "react";
import { Period } from "../interfaces/period";

interface PeriodTransferOptionProps {
  value: Period;
  label: string;
  selected: boolean;
  highlighted: boolean;
  onClick: (data: { value: Period; label: string }, event: any) => void;
  onDoubleClick: (data: { value: Period; label: string }, event: any) => void;
}

export default function PeriodTransferOption({ value, label, selected, highlighted, onDoubleClick, onClick, ...props }: PeriodTransferOptionProps) {
  const { id } = value ?? {};
  return (
    <div
      {...props}
      key={`${id}-${label}-option`}
      style={{ margin: 4, zIndex: "auto" }}
      onClick={(event) => onClick({ value, label }, event)}
      onDoubleClick={(event) => onDoubleClick({ value, label }, event)}>
      <Tag bold={highlighted} positive={highlighted || selected} dataTest={`${id}-option`} key={`${id}-option`} icon={<IconClock16 />}>
        {label}
      </Tag>
    </div>
  );
}
