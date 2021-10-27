/* eslint-disable import/no-unresolved */
import {Story} from "@storybook/react";
import React from 'react'
import PeriodSelector from "components/PeriodSelector";
import {CalendarTypes} from "components/PeriodSelector/components/CalendarSpecificPeriodDimension/constants/calendar";
import {PeriodSelectorProps} from "components/PeriodSelector/types/props";

const Template: Story<PeriodSelectorProps> = (args) => <PeriodSelector {...args} />


export const Default = Template.bind({})
Default.args = {
    onSelect: ({items}) => {
        console.log(items)
    },
    selectedPeriods: [],
    excludedPeriodTypes: [],
    calendar: CalendarTypes.GREGORIAN
}

export default {
    title: 'Components/Period Selector',
    component: PeriodSelector,
  

}
