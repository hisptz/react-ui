import { IconLaunch16 } from "@dhis2/ui";
import { IconButton } from "@material-ui/core";
import React from "react";

export default function LegendCardHeader({ title, collapsible, onCollapse }: { title: string; onCollapse?: () => void; collapsible?: boolean }) {
  return (
    <div className="row w-100 space-between align-items-center">
      <h4 style={{ margin: 0 }} className="legend-header">
        {title}
      </h4>
      {collapsible && (
        <IconButton onClick={onCollapse}>
          <IconLaunch16 />
        </IconButton>
      )}
    </div>
  );
}
