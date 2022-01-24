import i18n from "@dhis2/d2-i18n";
import { Button, Modal, ModalActions, ModalContent, ModalTitle, ButtonStrip } from "@dhis2/ui";
import React, { ReactNode } from "react";

export interface ConfirmDialogProps {
  title: string;
  message: string | ReactNode;
  size?: "small" | "large";
  position?: "top" | "bottom" | "middle";
  onConfirm: () => void;
  onCancel: () => void;
  cancelButtonText?: string;
  confirmButtonText?: string;
  hide: boolean;
  confirmButtonColor?: "primary" | "secondary" | "destructive";
}

export default function ConfirmDialog({
  message,
  size,
  onConfirm,
  onCancel,
  cancelButtonText,
  confirmButtonText,
  hide,
  confirmButtonColor,
  title,
  position,
}: ConfirmDialogProps) {
  return (
    <Modal position={position ?? "middle"} hide={hide} small={size === "small" || size === undefined} large={size === "large"}>
      <ModalTitle>{title ?? i18n.t("Confirm Action")}</ModalTitle>
      <ModalContent>{message}</ModalContent>
      <ModalActions>
        <ButtonStrip>
          <Button onClick={onCancel}>{cancelButtonText ?? i18n.t("Cancel")}</Button>
          <Button
            primary={confirmButtonColor === "primary"}
            secondary={confirmButtonColor === "secondary"}
            destructive={confirmButtonColor === "destructive" || confirmButtonColor === undefined}
            onClick={onConfirm}>
            {confirmButtonText ?? i18n.t("Confirm")}
          </Button>
        </ButtonStrip>
      </ModalActions>
    </Modal>
  );
}
