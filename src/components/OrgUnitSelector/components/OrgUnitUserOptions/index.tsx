import i18n from "@dhis2/d2-i18n";
import { CheckboxField, colors } from "@dhis2/ui";
import { OrgUnitSelection } from "@hisptz/dhis2-utils";
import React from "react";
import { onUserOrUnitChange, onUserSubUnitsChange, onUserSubX2Units } from "../../utils";

export function OrgUnitUserOptions({ value, onUpdate }: { onUpdate: ((value: OrgUnitSelection) => void) | undefined; value: OrgUnitSelection | undefined }) {
  const { userSubX2Unit, userOrgUnit, userSubUnit } = value ?? {};

  return (
    <div data-test="user-options-selector" style={{ background: colors.grey200 }} className="row space-between p-16">
      <CheckboxField
        dataTest={"user-org-unit"}
        checked={userOrgUnit}
        onChange={onUserOrUnitChange({ onUpdate, value })}
        label={i18n.t("User organisation unit")}
      />
      <CheckboxField
        dataTest={"user-sub-org-unit"}
        checked={userSubUnit}
        onChange={onUserSubUnitsChange({ onUpdate, value })}
        label={i18n.t("User sub-units")}
      />
      <CheckboxField
        dataTest={"user-sub-x2-org-unit"}
        checked={userSubX2Unit}
        onChange={onUserSubX2Units({ onUpdate, value })}
        label={i18n.t("User sub-x2-units")}
      />
    </div>
  );
}
