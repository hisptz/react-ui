import { Story } from "@storybook/react";
import React from "react";
import { CalendarTypes } from "./components/CalendarSpecificPeriodDimension/constants/calendar";
import { PeriodSelectorProps } from "./types/props";
import PeriodSelector from "./index";

const Template: Story<PeriodSelectorProps> = (args) => <PeriodSelector {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSelect: ({ items }) => {
    console.log(items);
  },
  selectedPeriods: [],
  excludedPeriodTypes: [],
  calendar: CalendarTypes.GREGORIAN,
};

export const Ethiopian = Template.bind({});
Ethiopian.args = {
  onSelect: ({ items }) => {
    console.log(items);
  },
  selectedPeriods: [],
  excludedPeriodTypes: [],
  calendar: CalendarTypes.ETHIOPIAN,
};

export const ExcludedFixedPeriodTypes = Template.bind({});
ExcludedFixedPeriodTypes.args = {
  onSelect: ({ items }) => {
    console.log(items);
  },
  selectedPeriods: [],
  excludedPeriodTypes: [],
  calendar: CalendarTypes.GREGORIAN,
  excludeFixedPeriods: true,
};

export const ExcludedRelativePeriodTypes = Template.bind({});
ExcludedRelativePeriodTypes.args = {
  onSelect: ({ items }) => {
    console.log(items);
  },
  selectedPeriods: [],
  excludedPeriodTypes: [],
  calendar: CalendarTypes.GREGORIAN,
  excludeRelativePeriods: true,
};

export const ExcludedPeriodTypes = Template.bind({});
ExcludedPeriodTypes.args = {
  onSelect: ({ items }) => {
    console.log(items);
  },
  selectedPeriods: [],
  excludedPeriodTypes: ["RelativeWeek", "RelativeMonth", "Monthly", "Weekly"],
  calendar: CalendarTypes.GREGORIAN,
};

export const SelectedPeriods = Template.bind({});
SelectedPeriods.args = {
  onSelect: ({ items }) => {
    console.log(items);
  },
  selectedPeriods: [
    {
      id: "2020",
      name: "2020",
      type: "Fixed",
    },
    {
      id: "202001",
      name: "January 2020",
      type: "Fixed",
    },
  ],
  excludedPeriodTypes: [],
  calendar: CalendarTypes.GREGORIAN,
};

export default {
  title: "Components/Period Selector",
  component: PeriodSelector,
  argTypes: {
    selectedPeriods: {
      control: "array",
    },
    calendar: {
      control: "radio",
      options: [CalendarTypes.GREGORIAN, CalendarTypes.ETHIOPIAN],
    },
  },
};
