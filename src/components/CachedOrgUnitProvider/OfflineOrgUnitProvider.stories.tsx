import { Button } from "@dhis2/ui";
import type { Story } from "@storybook/react";
import React from "react";
import { OrgUnitSelector } from "../../index";
import FullPageLoader from "../shared/components/FullPageLoader";
import type { OfflineOrgUnitProviderProps } from "./index";
import { CustomOrgUnitProvider, OfflineOrgUnitProvider, useClearOrganisationData } from "./index";

const Template: Story<OfflineOrgUnitProviderProps> = (args) => <OfflineOrgUnitProvider {...args}>{args.children}</OfflineOrgUnitProvider>;

export const Default = Template.bind({});
Default.args = {
  children: (
    <CustomOrgUnitProvider>
      <OrgUnitSelector searchable />
    </CustomOrgUnitProvider>
  ),
};

export const WithFilteredOrgUnitGroups = Template.bind({});
WithFilteredOrgUnitGroups.args = {
  children: (
    <CustomOrgUnitProvider>
      <OrgUnitSelector searchable filterByGroups={["RXL3lPSK8oG"]} />
    </CustomOrgUnitProvider>
  ),
};

export const WithInitialLoader = Template.bind({});
WithInitialLoader.args = {
  fallback: <FullPageLoader small />,
  children: (
    <CustomOrgUnitProvider>
      <OrgUnitSelector />
    </CustomOrgUnitProvider>
  ),
};

export const WithPageSize = Template.bind({});
WithPageSize.args = {
  fallback: <FullPageLoader small />,
  pageSize: 10000,
  children: (
    <CustomOrgUnitProvider>
      <OrgUnitSelector />
    </CustomOrgUnitProvider>
  ),
};

export default {
  title: "Components/Cached Organisation Unit Provider",
  component: OfflineOrgUnitProvider,
  decorators: [
    (Story: any) => {
      const clear = useClearOrganisationData();
      return (
        // <OrgUnitDataProvider>
        <div>
          <Story />
          <Button onClick={clear}>Clear cache</Button>
        </div>
        // </OrgUnitDataProvider>
      );
    },
  ],
};
