import { useContext } from "react";
import { ConfirmDialogContext } from "../states/dialog";

export default function useConfirmDialog() {
  return useContext(ConfirmDialogContext);
}
