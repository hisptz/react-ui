import { Story } from "@storybook/react";
import React from "react";
import DataSource from "../DataSource";
import CustomAccordion, { CustomAccordionProps } from "./index";

const Template: Story<CustomAccordionProps> = (args) => <CustomAccordion {...args} />;

export const BasicAccordion = Template.bind({});

BasicAccordion.args = {
  id: "1",
  title: "Accordion",
  children: (
    <div className={"column "} style={{ gap: 16 }}>
      <DataSource id={"1"} label={"DataSource 1"} selected={false} />
      <DataSource id={"2"} label={"DataSource 2"} selected={false} />
      <DataSource id={"3"} label={"DataSource 3"} selected={false} />
    </div>
  ),
};

export const EditableTitle = Template.bind({});

EditableTitle.args = {
  id: "1",
  title: "Accordion",
  editableTitle: true,
  children: (
    <div className={"column "} style={{ gap: 16 }}>
      <DataSource id={"1"} label={"DataSource 1"} selected={false} />
      <DataSource id={"2"} label={"DataSource 2"} selected={false} />
      <DataSource id={"3"} label={"DataSource 3"} selected={false} />
    </div>
  ),
};

export const Deletable = Template.bind({});

Deletable.args = {
  id: "1",
  title: "Accordion",
  editableTitle: true,
  deletable: true,
  children: (
    <div className={"column "} style={{ gap: 16 }}>
      <DataSource id={"1"} label={"DataSource 1"} selected={false} />
      <DataSource id={"2"} label={"DataSource 2"} selected={false} />
      <DataSource id={"3"} label={"DataSource 3"} selected={false} />
    </div>
  ),
};

export default {
  title: "Components/DataConfigurationArea/DataConfigurationAreaGroup",
  component: CustomAccordion,
  decorators: [
    (AccordionStory: any) => (
      <div style={{ width: "100%", height: "100%", padding: "24px" }}>
        <AccordionStory />
      </div>
    ),
  ],
};
