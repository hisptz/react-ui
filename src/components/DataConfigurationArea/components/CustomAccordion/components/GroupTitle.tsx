import i18n from "@dhis2/d2-i18n";
import { Button, ButtonStrip, CssReset, IconDelete24 as DeleteIcon, IconEdit24 as EditIcon, Input } from "@dhis2/ui";
import { IconButton } from "@material-ui/core";
import React, { useState } from "react";
import classes from "../../../DataConfiguration.module.css";

export interface GroupTitleProps {
  id: string;
  title: string;
  onDelete?: (id: string) => void;
  editable?: boolean;
  deletable?: boolean;
  onEdit?: (id: string, value: string) => void;
  onExpand?: (id: string, expanded: boolean) => void;
  rightAdornment?: (props: { id: string }) => React.ReactNode;
}

export default function GroupTitle({ title, onDelete, id, onEdit, editable, deletable, rightAdornment,onExpand }: GroupTitleProps) {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(title);
  console.log("onexpand ",onExpand)

  const onSaveClick = () => {
    setEditOpen(false);
    if (onEdit) {
      if (editTitle) {
        onEdit(id, editTitle);
      } else {
        onEdit(id, title);
      }
    }
  };

  const RightAdornment: any | null = rightAdornment || null;

  return (
    <>
      <CssReset />
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: 16 }} className={classes["accordion-title-container"]}>
        <div className="row space-between align-items-center w-100">
          <div style={{ gap: 8, width: editOpen ? "100%" : "auto" }} className="row align-items-center">
            <div className="column w-100">
              {editOpen ? (
                <Input fullWidth initialFocus value={editTitle} onChange={({ value }: { value: string }) => setEditTitle(value)} />
              ) : (
                <p
                  style={{ margin: 4 }}
                  onDoubleClick={(event: { stopPropagation: () => void; }) => {
                    event.stopPropagation();
                    if (editable) {
                      setEditOpen(true);
                    }
                  }}
                  onChange={(event, expanded) => {
                    event.stopPropagation()
                    if (onExpand) {
                      onExpand(id, expanded);
                    }
                  }}
                  className="accordion-title group-name-area">
                  {title}
                </p>
              )}
            </div>
            {editOpen ? null : editable ? (
              <IconButton
                onClick={(event: { stopPropagation: () => void; }) => {
                  event.stopPropagation();
                  setEditOpen(true);
                }}
                size="small"
                className={classes["accordion-title-edit"]}>
                <EditIcon />
              </IconButton>
            ) : null}
          </div>
        </div>
        {!editOpen && RightAdornment ? <div className="row align-items-center">{<RightAdornment id={id} />}</div> : null}
        <div className="row align-items-center">
          {editOpen ? (
            <ButtonStrip end>
              <Button onClick={onSaveClick}>{i18n.t("Save")}</Button>
              <Button
                onClick={(_: any, event: { stopPropagation: () => void }) => {
                  event.stopPropagation();
                  setEditOpen(false);
                  setEditTitle(title);
                }}>
                {i18n.t("Cancel")}
              </Button>
            </ButtonStrip>
          ) : deletable ? (
            <Button
              className="delete-group-icon"
              onClick={(_: any, event: any) => {
                event.stopPropagation();
                if (onDelete) {
                  onDelete(id);
                }
              }}
              icon={<DeleteIcon />}>
              {i18n.t("Delete")}
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
}
