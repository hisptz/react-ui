import React from "react";
import {CalendarTypes} from "./components/CalendarSpecificPeriodDimension/constants/calendar";
import {PeriodSelectorProps} from "./interfaces/props";
import CalendarSpecificPeriodSelector from "components/PeriodSelector/components/CalendarSpecificPeriodDimension";

export default function PeriodSelector({
                                           excludedPeriodTypes,
                                           calendar,
                                           selectedPeriods,
                                           onSelect
                                       }: PeriodSelectorProps) {


    return <CalendarSpecificPeriodSelector
        excludedPeriodTypes={excludedPeriodTypes ?? []}
        calendar={calendar ?? CalendarTypes.GREGORIAN} onSelect={onSelect}
        selectedPeriods={selectedPeriods}
    />
}





