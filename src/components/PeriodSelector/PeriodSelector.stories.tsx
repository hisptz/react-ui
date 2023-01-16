import type { Story } from "@storybook/react";
import React from "react";
import { CalendarTypes } from "./components/CalendarSpecificPeriodDimension/constants/calendar";
import { PeriodSelectorProps } from "./types/props";
import PeriodSelector from "./index";

const Template: Story<PeriodSelectorProps> = (args, context) => <PeriodSelector {...args} {...context} />;

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

export const SingleSelection = Template.bind({});
SingleSelection.args = {
  onSelect: ({ items }) => {
    console.log(items);
  },
  selectedPeriods: [],
  excludedPeriodTypes: ["RelativeWeek", "RelativeMonth", "Monthly", "Weekly"],
  calendar: CalendarTypes.GREGORIAN,
};

export const SelectedDateRangePeriod = Template.bind({});
SelectedDateRangePeriod.args = {
  onSelect: ({ items }) => {
    console.log(items);
  },
  enableDateRange: true,
  selectedPeriods: [
    {
      startDate: "2022-01-01",
      endDate: "2022-12-31",
      type: "RANGE",
    },
  ],
  excludedPeriodTypes: [],
  calendar: CalendarTypes.GREGORIAN,
};
export const SelectedPeriods = Template.bind({});
SelectedPeriods.args = {
  onSelect: ({ items }) => {
    console.log(items);
  },
  enableDateRange: true,
  selectedPeriods: [
    {
      id: "2022",
      name: "2022",
    },
  ],
  excludedPeriodTypes: [],
  calendar: CalendarTypes.GREGORIAN,
};

export const WithAllowedFuturePeriods = Template.bind({});
WithAllowedFuturePeriods.args = {
  onSelect: ({ items }) => {
    console.log(items);
  },
  enableDateRange: true,
  selectedPeriods: [
    {
      id: "2022",
      name: "2022",
    },
  ],
  allowFuturePeriods: false,
  excludedPeriodTypes: [],
  calendar: CalendarTypes.GREGORIAN,
};

export const DateRange = Template.bind({});
DateRange.args = {
  onSelect: ({ items }) => {
    console.log(items);
  },
  enableDateRange: true,
  selectedPeriods: [],
  excludedPeriodTypes: [],
  calendar: CalendarTypes.GREGORIAN,
  defaultInputType: "dateRange",
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
  decorators: [
    (Story: any) => {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <Story />
        </div>
      );
    },
  ],
};
