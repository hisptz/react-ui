import { Story } from "@storybook/react";
import OrgUnitSelector from "components/OrgUnitSelector/index";
import { OrgUnitSelectorProps } from "components/OrgUnitSelector/types";
export declare const Default: Story<OrgUnitSelectorProps>;
export declare const WithUserOptions: Story<OrgUnitSelectorProps>;
export declare const WithLevels: Story<OrgUnitSelectorProps>;
export declare const WithGroups: Story<OrgUnitSelectorProps>;
export declare const WithLevelsAndGroups: Story<OrgUnitSelectorProps>;
export declare const WithAllOptions: Story<OrgUnitSelectorProps>;
declare const _default: {
    title: string;
    component: typeof OrgUnitSelector;
    decorators: ((OrgUnitStory: any) => JSX.Element)[];
};
export default _default;
