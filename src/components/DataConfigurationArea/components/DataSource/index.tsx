import i18n from "@dhis2/d2-i18n";
import { Button, colors, CssReset, IconDelete16, IconDragHandle24 } from "@dhis2/ui";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import classes from "./DataSource.module.css";

export interface DataSourceProps {
  id: string;
  label: string;
  subLabel?: string;
  selected: boolean;
  deletable?: boolean;
  onDelete?: (id: string) => void;
  icon?: React.ReactNode;
  draggable?: boolean;
  index?: number;
  onClick?: (id: string, e?: React.MouseEvent<HTMLDivElement>) => void;
}

const DataSourceElement = ({ id, onDelete, label, subLabel, selected, icon, onClick, deletable, draggable }: DataSourceProps) => (
  <div
    id={`${id}-data-source`}
    onClick={(e) => onClick && onClick(id, e)}
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
        <div style={{ gap: 8 }} className="row align-items-center">
          {draggable && (
            <div className={classes["drag-handle"]} style={{ cursor: "move", display: "flex", alignItems: "center" }}>
              <IconDragHandle24 color={colors.grey700} />
            </div>
          )}
          {icon}
        </div>
        <div className="column">
          <p style={{ margin: 2 }}>{label}</p>
          {subLabel ? <p style={{ color: colors.grey800, margin: 2, fontSize: "0.8rem" }}>{subLabel}</p> : null}
        </div>
      </div>
      {deletable &&
        (onDelete ? (
          <Button onClick={() => onDelete(id)} icon={<IconDelete16 />}>
            {i18n.t("Delete")}
          </Button>
        ) : null)}
    </div>
  </div>
);

export default function DataSource(props: DataSourceProps) {
  return props.draggable && props.index !== undefined ? (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            userSelect: "none",
            opacity: snapshot.isDragging ? 0.5 : 1,
          }}>
          <DataSourceElement {...props} />
        </div>
      )}
    </Draggable>
  ) : (
    <DataSourceElement {...props} />
  );
}
