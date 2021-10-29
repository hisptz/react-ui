import { Story } from "@storybook/react";
import PeriodSelector from "components/PeriodSelector/index";
import { PeriodSelectorProps } from "components/PeriodSelector/types/props";
export declare const Default: Story<PeriodSelectorProps>;
export declare const Ethiopian: Story<PeriodSelectorProps>;
export declare const ExcludedFixedPeriodTypes: Story<PeriodSelectorProps>;
export declare const ExcludedRelativePeriodTypes: Story<PeriodSelectorProps>;
export declare const ExcludedPeriodTypes: Story<PeriodSelectorProps>;
export declare const SelectedPeriods: Story<PeriodSelectorProps>;
declare const _default: {
    title: string;
    component: typeof PeriodSelector;
    argTypes: {
        selectedPeriods: {
            control: string;
        };
        calendar: {
            control: string;
            options: string[];
        };
    };
};
export default _default;
