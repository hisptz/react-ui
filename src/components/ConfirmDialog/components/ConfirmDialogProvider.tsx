import React, { ReactNode, useCallback, useState } from "react";
import { ConfirmDialogContext } from "../states/dialog";
import ConfirmDialog from "./ConfirmDialog";

export interface ConfirmDialogConfig {
  title: string;
  message: string | ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  size?: "small" | "large";
  position?: "top" | "bottom" | "middle";
  cancelButtonText?: string;
  confirmButtonText?: string;
  confirmButtonColor?: "primary" | "secondary" | "destructive";
}

export default function ConfirmDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<ConfirmDialogConfig | null>();

  const confirm = useCallback((config: ConfirmDialogConfig) => {
    setConfig(config);
    setOpen(true);
  }, []);

  const onCancel = useCallback(() => {
    setOpen(false);
    setConfig(null);
    if (config?.onCancel) {
      config.onCancel();
    }
  }, [config]);

  const onConfirm = useCallback(() => {
    setOpen(false);
    setConfig(null);
    if (config) {
      config.onConfirm();
    }
  }, [config]);

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      {config && <ConfirmDialog hide={!open} {...config} onConfirm={onConfirm} onCancel={onCancel} />}
    </ConfirmDialogContext.Provider>
  );
}
