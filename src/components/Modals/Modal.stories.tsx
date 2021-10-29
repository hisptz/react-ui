import { Story } from "@storybook/react";
import React from "react";
import OrgUnitSelectorModal from "./components/OrgUnitSelectorModal";
import PeriodSelectorModal from "./components/PeriodSelectorModal";
import { ModalProps } from "components/Modals/types";
import { OrgUnitSelectorProps } from "components/OrgUnitSelector/types/index";

const PeriodTemplate: Story<ModalProps> = (args) => <PeriodSelectorModal {...args} />;
const OrgUnitTemplate: Story<ModalProps & OrgUnitSelectorProps> = (args) => <OrgUnitSelectorModal {...args} />;

export const PeriodSelector = PeriodTemplate.bind({});
PeriodSelector.args = {
  hide: false,
  onClose: () => {},
  onUpdate: (value) => console.log(value),
};

export const OrgUnitSelector = OrgUnitTemplate.bind({});
OrgUnitSelector.args = {
  hide: false,
  onClose: () => {},
  onUpdate: (value) => console.log(value),
  singleSelection: true,
};

export default {
  title: "Components/Modals",
  components: [PeriodSelectorModal],
};
