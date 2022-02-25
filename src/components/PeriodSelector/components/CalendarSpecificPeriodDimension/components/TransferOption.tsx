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

export default function PeriodTransferOption({ value: id, label, selected, highlighted, onDoubleClick, onClick, ...props }: PeriodTransferOptionProps) {
  return (
    <div
      {...props}
      key={`${id}-${label}-option`}
      style={{ margin: 4, zIndex: "auto" }}
      onClick={(event) => onClick({ value: id, label }, event)}
      onDoubleClick={(event) => onDoubleClick({ value: id, label }, event)}>
      <Tag
        bold={highlighted}
        positive={highlighted || selected}
        dataTest={`${id}-option`}
        key={`${id}-option`}
        icon={
          <div className="size-8">
            <IconClock16 />
          </div>
        }>
        {label}
      </Tag>
    </div>
  );
}
