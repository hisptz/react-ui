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
}

export default function GroupTitle({ title, onDelete, id, onEdit, editable, deletable }: GroupTitleProps) {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(title);

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
                  style={{ fontWeight: "bold", margin: 4 }}
                  onDoubleClick={(event) => {
                    event.stopPropagation();
                    if (editable) {
                      setEditOpen(true);
                    }
                  }}
                  onClick={(event) => event.stopPropagation()}
                  className="accordion-title group-name-area">
                  {title}
                </p>
              )}
            </div>
            {editOpen ? null : editable ? (
              <IconButton
                onClick={(event) => {
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
