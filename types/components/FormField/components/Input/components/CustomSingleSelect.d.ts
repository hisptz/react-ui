import { OnChange } from "../types";
declare type CustomSingleSelectProps = {
    options: Array<{
        label: string;
        value: any;
    }>;
    onChange: OnChange;
    value: any;
    name: string;
};
export default function CustomSingleSelect({ options, onChange, value, name, ...props }: CustomSingleSelectProps): JSX.Element;
export {};
