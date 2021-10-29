import { Story } from "@storybook/react";
import { DataSourceSelectorProps } from "./types";
import DataSourceSelector from "./index";
import "styles/styles.css";
export declare const IndicatorSelector: Story<DataSourceSelectorProps>;
export declare const WithMaxSelection: Story<DataSourceSelectorProps>;
export declare const WithAllAvailableDataSources: Story<DataSourceSelectorProps>;
declare const _default: {
    title: string;
    component: typeof DataSourceSelector;
    decorators: ((DataSourceSelectorStory: any) => JSX.Element)[];
    argTypes: {
        maxSelections: {
            control: string;
            options: (string | number)[];
        };
    };
};
export default _default;
