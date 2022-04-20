import { createContext } from "react";
import { ConfirmDialogConfig } from "../components/ConfirmDialogProvider";

export const ConfirmDialogContext = createContext<{ confirm: (config: ConfirmDialogConfig) => void }>({
  confirm: () => {
    return;
  },
});
