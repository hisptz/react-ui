import { Period } from "../interfaces/period";
interface PeriodTransferOptionProps {
    value: Period;
    label: string;
    selected: boolean;
    highlighted: boolean;
    onClick: (data: {
        value: Period;
        label: string;
    }, event: any) => void;
    onDoubleClick: (data: {
        value: Period;
        label: string;
    }, event: any) => void;
}
export default function PeriodTransferOption({ value, label, selected, highlighted, onDoubleClick, onClick, ...props }: PeriodTransferOptionProps): JSX.Element;
export {};
