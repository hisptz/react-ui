import i18n from "@dhis2/d2-i18n";
import { cloneDeep, findIndex, set } from "lodash";
import { useCallback } from "react";
import { useConfirmDialog } from "../../ConfirmDialog";
import { LegendDefinition } from "../../FormField/types";
import { getDefaultLegendDefinitions, getNonDefaultLegendDefinitions } from "../utils";

export function useManageLegendDefinitions(
  legendDefinitions: LegendDefinition[],
  {
    onChange,
    shouldVerify,
    onResetLegends,
  }: {
    onChange: (definitions: LegendDefinition[]) => void;
    shouldVerify: boolean;
    onResetLegends: (newDefinitions: LegendDefinition[]) => void;
  }
) {
  const { confirm } = useConfirmDialog();
  const nonDefaultLegendDefinitions = getNonDefaultLegendDefinitions(legendDefinitions);
  const defaultLegendDefinitions = getDefaultLegendDefinitions(legendDefinitions);

  const onAdd = useCallback(
    (value) => {
      const newLegendDefinitions = [...cloneDeep(legendDefinitions), value];

      function add() {
        onChange(newLegendDefinitions);
      }

      if (shouldVerify) {
        confirm({
          onCancel(): void {
            console.log("Cancelled");
          },
          title: i18n.t("Confirm legend reset"),
          message: i18n.t("Adding a legend definition will reset all legends to their default values. Are you sure you want to continue?"),
          confirmButtonColor: "primary",
          confirmButtonText: i18n.t("Reset"),
          onConfirm: () => {
            add();
            onResetLegends(newLegendDefinitions);
          },
          customActions: [
            {
              label: i18n.t("Leave as is"),
              onClick: () => {
                add();
              },
            },
          ],
        });
      } else {
        add();
      }
    },
    [confirm, legendDefinitions, onResetLegends, shouldVerify]
  );

  const onDelete = useCallback(
    (data) => {
      const updatedDefinitions = cloneDeep(legendDefinitions);
      const index = findIndex(updatedDefinitions, ({ id: legendDefinitionId }) => legendDefinitionId === data.id);
      updatedDefinitions.splice(index, 1);

      function deleteDefinition() {
        onChange(updatedDefinitions);
      }

      if (shouldVerify) {
        confirm({
          onCancel(): void {
            console.log("Cancelled");
          },
          title: `${i18n.t("Confirm legends reset")}`,
          message: `${i18n.t("Deleting this definition will reset all configured legends. Are you sure you want to delete this legend definition?")}`,
          confirmButtonColor: "primary",
          confirmButtonText: i18n.t("Reset"),
          onConfirm: () => {
            deleteDefinition();
            onResetLegends(updatedDefinitions);
          },
        });
      } else {
        deleteDefinition();
      }
    },
    [confirm, legendDefinitions, onResetLegends, shouldVerify]
  );

  const onEdit = (data: { id: any }) => {
    const updatedDefinitions = cloneDeep(legendDefinitions);
    const index = findIndex(updatedDefinitions, ({ id: legendDefinitionId }) => legendDefinitionId === data.id);
    set(updatedDefinitions, index, data);
    onChange(updatedDefinitions);
  };
  return {
    nonDefaultLegendDefinitions,
    defaultLegendDefinitions,
    onAdd,
    onDelete,
    onEdit,
  };
}
