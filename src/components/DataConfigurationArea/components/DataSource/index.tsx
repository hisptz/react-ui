import i18n from "@dhis2/d2-i18n";
import { Button, colors, CssReset, IconDelete16 } from "@dhis2/ui";
import React from "react";

export interface DataSourceProps {
  id: string;
  label: string;
  subLabel?: string;
  selected: boolean;
  onDelete?: (id: string) => void;
  icon?: React.ReactNode;
  draggable?: boolean;
  onClick?: (id: string) => void;
}

export default function DataSource({ id, onDelete, label, subLabel, selected, icon, onClick }: DataSourceProps) {
  return (
    <div
      id={`${id}-data-source`}
      onClick={() => onClick && onClick(id)}
      style={{
        border: `1px solid ${colors.grey500}`,
        background: selected ? "#B2DFDB" : undefined,
        padding: 8,
        width: "100%",
        borderRadius: 2,
      }}>
      <CssReset />
      <div className="row space-between align-items-center">
        <div className="row align-items-center" style={{ gap: 16 }}>
          {icon}
          <div className="column">
            <p style={{ margin: 2 }}>{label}</p>
            {subLabel ? <p style={{ color: colors.grey800, margin: 2, fontSize: "0.8rem" }}>{subLabel}</p> : null}
          </div>
        </div>
        {onDelete ? <Button icon={<IconDelete16 />}>{i18n.t("Delete")}</Button> : null}
      </div>
    </div>
  );
}
