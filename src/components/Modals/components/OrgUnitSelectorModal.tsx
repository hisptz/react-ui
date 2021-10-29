import i18n from "@dhis2/d2-i18n";
import { Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle } from "@dhis2/ui";
import { flatten, last } from "lodash";
import React, { useCallback, useState } from "react";
import { ModalProps } from "components/Modals/types";
import OrgUnitSelector from "components/OrgUnitSelector/index";
import { OrgUnitSelectorProps, OrgUnitSelectorValue } from "components/OrgUnitSelector/types/index";

export default function OrgUnitSelectorModal({
  small,
  large,
  position,
  onClose,
  hide,
  onUpdate,
  updateButtonLabel,
  singleSelection,
  ...props
}: ModalProps & OrgUnitSelectorProps) {
  const [selectedOrgUnits, setSelectedOrgUnits] = useState<OrgUnitSelectorValue>({ orgUnits: [] });

  const onSelect = useCallback((value: OrgUnitSelectorValue) => {
    if (singleSelection) {
      const updatedValue = { ...value, orgUnits: flatten([last(value.orgUnits) ?? []]) };
      setSelectedOrgUnits(updatedValue);
      return;
    }
    setSelectedOrgUnits(value);
  }, []);

  const onUpdateClick = useCallback(() => {
    onUpdate(selectedOrgUnits);
  }, []);

  return (
    <Modal hide={hide} small={small} large={large} onClose={onClose} position={position}>
      <ModalTitle>{i18n.t("Select Organisation Unit(s)")}</ModalTitle>
      <ModalContent>
        <OrgUnitSelector {...props} value={selectedOrgUnits} onUpdate={onSelect} singleSelection={singleSelection} />
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
