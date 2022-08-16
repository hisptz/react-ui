import { Button } from "@dhis2/ui";
import type { Story } from "@storybook/react";
import React from "react";
import OrgUnitDataProvider from "../../dataProviders/orgUnit";
import { OrgUnitSelector } from "../../index";
import FullPageLoader from "../shared/components/FullPageLoader";
import type { OfflineOrgUnitProviderProps } from "./index";
import OfflineOrgUnitProvider, { CustomOrgUnitProvider, useClearOrganisationData } from "./index";

const Template: Story<OfflineOrgUnitProviderProps> = (args) => <OfflineOrgUnitProvider {...args}>{args.children}</OfflineOrgUnitProvider>;

export const Default = Template.bind({});
Default.args = {
  children: (
    <CustomOrgUnitProvider>
      <OrgUnitSelector />
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

export default {
  title: "Components/Cached Organisation Unit Provider",
  component: OfflineOrgUnitProvider,
  decorators: [
    (Story: any) => {
      const clear = useClearOrganisationData();
      return (
        <OrgUnitDataProvider>
          <div>
            <Story />
            <Button onClick={clear}>Clear cache</Button>
          </div>
        </OrgUnitDataProvider>
      );
    },
  ],
};
