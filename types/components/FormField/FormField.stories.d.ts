import { Story } from "@storybook/react";
import { InputProps } from "./components/Input/types";
import { Input } from "./index";
export declare const NativeInputs: Story<InputProps>;
export declare const LegendDefinitionInput: Story<InputProps>;
export declare const LegendMinMax: Story<InputProps>;
export declare const MultipleFields: Story<InputProps>;
export declare const MultipleFieldsWithSpecifiedListOfFields: Story<InputProps>;
declare const _default: {
    title: string;
    component: typeof Input;
    decorators: ((InputStory: any) => JSX.Element)[];
};
export default _default;
