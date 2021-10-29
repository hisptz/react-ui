import { Story } from "@storybook/react";
import { OrgUnitSelectorProps } from "../OrgUnitSelector/types";
import PeriodSelectorModal from "./components/PeriodSelectorModal";
import { ModalProps } from "components/Modals/types";
export declare const PeriodSelector: Story<ModalProps>;
export declare const OrgUnitSelector: Story<ModalProps & OrgUnitSelectorProps>;
declare const _default: {
    title: string;
    components: (typeof PeriodSelectorModal)[];
};
export default _default;
