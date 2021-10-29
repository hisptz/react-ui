import { Story } from "@storybook/react";
import PeriodSelectorModal from "./components/PeriodSelectorModal";
import { ModalProps } from "components/Modals/types";
import { OrgUnitSelectorProps } from "components/OrgUnitSelector/types/index";
export declare const PeriodSelector: Story<ModalProps>;
export declare const OrgUnitSelector: Story<ModalProps & OrgUnitSelectorProps>;
declare const _default: {
    title: string;
    components: (typeof PeriodSelectorModal)[];
};
export default _default;
