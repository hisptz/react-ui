import i18n from "@dhis2/d2-i18n";
import { Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle } from "@dhis2/ui";
import type { OrganisationUnit, OrgUnitSelection } from "@hisptz/dhis2-utils";
import { flatten, last } from "lodash";
import React, { useCallback, useState } from "react";
import OrgUnitSelector from "../../OrgUnitSelector";
import { OrgUnitSelectorProps, OrgUnitSelectorValue } from "../../OrgUnitSelector/types";
import { ModalProps } from "../types";

export default function OrgUnitSelectorModal({
  small,
  large,
  position,
  onClose,
  hide,
  onUpdate,
  updateButtonLabel,
  singleSelection,
  value,
  ...props
}: ModalProps & OrgUnitSelectorProps) {
  const [selectedOrgUnits, setSelectedOrgUnits] = useState<OrgUnitSelection | undefined>(value);

  const onSelect = useCallback(
    (value: OrgUnitSelection) => {
      if (singleSelection) {
        const updatedValue = { ...value, orgUnits: flatten([last(value.orgUnits) ?? []]) };
        setSelectedOrgUnits(updatedValue);
        return;
      }
      setSelectedOrgUnits(value);
    },
    [singleSelection]
  );

  const onUpdateClick = useCallback(() => {
    onUpdate(selectedOrgUnits);
  }, [selectedOrgUnits, onUpdate]);

  return (
    <Modal hide={hide} small={small} large={large} onClose={onClose} position={position}>
      <ModalTitle>{singleSelection ? i18n.t("Select Organisation Unit") : i18n.t("Select Organisation Unit(s)")}</ModalTitle>
      <ModalContent>
        <OrgUnitSelector {...props} value={selectedOrgUnits} onUpdate={onSelect} singleSelection={singleSelection} />
      </ModalContent>
      <ModalActions>
        <ButtonStrip>
          <Button onClick={onClose}>{i18n.t("Cancel")}</Button>
          <Button dataTest={"modal-update-button"} primary onClick={onUpdateClick}>
            {updateButtonLabel ?? i18n.t("Update")}
          </Button>
        </ButtonStrip>
      </ModalActions>
    </Modal>
  );
}
