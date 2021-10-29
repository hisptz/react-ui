import i18n from "@dhis2/d2-i18n";
import { Button, Modal, ModalActions, ModalContent, ModalTitle, ButtonStrip } from "@dhis2/ui";
import React, { useCallback, useState } from "react";
import PeriodSelector from "../../PeriodSelector/index";
import { PeriodSelectorProps } from "../../PeriodSelector/types/props";
import { ModalProps } from "../types";

export default function PeriodSelectorModal({
  small,
  large,
  position,
  onClose,
  hide,
  onUpdate,
  updateButtonLabel,
  ...props
}: ModalProps & PeriodSelectorProps) {
  const [selectedPeriods, setSelectedPeriods] = useState<Array<any>>([]);

  const onSelect = useCallback(({ items }) => {
    setSelectedPeriods(items);
  }, []);

  const onUpdateClick = useCallback(() => {
    onUpdate(selectedPeriods);
  }, []);

  return (
    <Modal hide={hide} small={small} large={large} onClose={onClose} position={position}>
      <ModalTitle>{i18n.t("Select Period")}</ModalTitle>
      <ModalContent>
        <PeriodSelector {...props} selectedPeriods={selectedPeriods} onSelect={onSelect} />
      </ModalContent>
      <ModalActions>
        <ButtonStrip>
          <Button onClick={onClose}>{i18n.t("Cancel")}</Button>
          <Button primary onClick={onUpdateClick}>
            {updateButtonLabel ?? i18n.t("Update")}
          </Button>
        </ButtonStrip>
      </ModalActions>
    </Modal>
  );
}
