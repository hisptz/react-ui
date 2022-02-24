import ConfirmDialog, {
  ConfirmDialogProps,
  CustomAction as ConfirmDialogCustomAction
} from "./components/ConfirmDialog";
import ConfirmDialogProvider, { ConfirmDialogConfig } from "./components/ConfirmDialogProvider";
import useConfirmDialog from "./hooks/useConfirmDialog";

export { ConfirmDialogProvider, ConfirmDialog, useConfirmDialog };
export type { ConfirmDialogConfig, ConfirmDialogProps, ConfirmDialogCustomAction };
