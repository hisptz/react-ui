import {Tag} from '@dhis2/ui'
import PeriodIcon from "@material-ui/icons/AccessTime";
import React from 'react'
import {Period} from "../interfaces/period";

interface PeriodTransferOptionProps {
    value: Period,
    label: string,
    selected: boolean,
    highlighted: boolean,
    onClick: (data: { value: Period, label: string }, event: any) => void,
    onDoubleClick: (data: { value: Period, label: string }, event: any) => void
}


export default function PeriodTransferOption({
                                                 value,
                                                 label,
                                                 selected,
                                                 highlighted,
                                                 onDoubleClick,
                                                 onClick,
                                                 ...props
                                             }: PeriodTransferOptionProps) {
    const {id} = value ?? {}
    return (
        <div
            {...props}
            style={{margin: 4, zIndex: "auto"}}
            onClick={(event) => onClick({value, label}, event)}
            onDoubleClick={(event) => onDoubleClick({value, label}, event)}
        >
            <Tag
                bold={highlighted}
                positive={highlighted || selected}
                dataTest={`${id}-option`}
                key={`${id}-option`}
                icon={<PeriodIcon style={{fontSize: 12}}/>}>
                {label}
            </Tag>
        </div>
    )
}
