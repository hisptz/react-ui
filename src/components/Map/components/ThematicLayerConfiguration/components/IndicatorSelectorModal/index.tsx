import i18n from "@dhis2/d2-i18n";
import { Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle } from "@dhis2/ui";
import DataSourceSelector from "../../../../../DataSourceSelector";
import React, { useCallback, useState } from "react";

export default function IndicatorSelectorModal({
  onUpdate,
  onClose,
  hide,
  selected,
  disabled,
  ...props
}: {
  onUpdate: (data: any) => void;
  onClose: () => void;
  hide: boolean;
  selected: any;
  disabled?: string[];
}) {
  const [selectedIndicators, setSelectedIndicators] = useState(selected);

  const onUpdateClick = useCallback(() => {
    onUpdate(selectedIndicators);
    onClose();
  }, [onUpdate, selectedIndicators]);

  const onSelect = useCallback((indicators: any) => {
    setSelectedIndicators(indicators);
  }, []);

  return (
    <Modal placement="middle" hide={hide} onClose={onClose}>
      <ModalTitle>{i18n.t("Select Data Item")}</ModalTitle>
      <ModalContent>
        <DataSourceSelector {...props} disabled={disabled} maxSelections={1} selected={selectedIndicators} onSelect={onSelect} />
      </ModalContent>
      <ModalActions>
        <ButtonStrip>
          <Button onClick={onClose}>{i18n.t("Cancel")}</Button>
          <Button primary onClick={onUpdateClick}>
            {i18n.t("Update")}
          </Button>
        </ButtonStrip>
      </ModalActions>
    </Modal>
  );
}
