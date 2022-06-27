import type { Story } from "@storybook/react";
import React from "react";
import { OrgUnitSelectorProps } from "../OrgUnitSelector/types";
import { PeriodSelectorProps } from "../PeriodSelector/types/props";
import OrgUnitSelectorModal from "./components/OrgUnitSelectorModal";
import PeriodSelectorModal from "./components/PeriodSelectorModal";
import { ModalProps } from "./types";

const PeriodTemplate: Story<ModalProps & PeriodSelectorProps> = (args) => <PeriodSelectorModal {...args} />;
const OrgUnitTemplate: Story<ModalProps & OrgUnitSelectorProps> = (args) => <OrgUnitSelectorModal {...args} />;

export const PeriodSelector = PeriodTemplate.bind({});
PeriodSelector.args = {
  hide: false,
  onClose: () => {
    console.log("onClose");
  },
  onUpdate: (value) => console.log(value),
  singleSelection: true,
};

export const OrgUnitSelector = OrgUnitTemplate.bind({});
OrgUnitSelector.args = {
  hide: false,
  onClose: () => {
    return;
  },
  onUpdate: (value) => console.log(value),
  singleSelection: true,
};

export default {
  title: "Components/Modals",
  components: [PeriodSelectorModal],
};
