import { IconChevronDown24 } from "@dhis2/ui";
import React from "react";
import GroupTitle from "./components/GroupTitle";
import { Accordion, AccordionDetails, AccordionSummary } from "./components/MUIAccordion";

export interface CustomAccordionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  editableTitle?: boolean;
  deletable?: boolean;
  onDelete?: (id: string) => void;
  onTitleChange?: (id: string, title: string) => void;
  onExpand?: (id: string, expanded: boolean) => void;
}

export default function CustomAccordion({ id, title, children, editableTitle, onTitleChange, deletable, onDelete, onExpand }: CustomAccordionProps) {
  return (
    <Accordion
      style={{ width: "100%" }}
      onChange={(event, expanded) => {
        if (onExpand) {
          onExpand(id, expanded);
        }
      }}>
      <AccordionSummary expandIcon={<IconChevronDown24 />}>
        <GroupTitle id={id} title={title} editable={editableTitle} onEdit={onTitleChange} deletable={deletable} onDelete={onDelete} />
      </AccordionSummary>
      <AccordionDetails>
        <div className="column h-100 w-100 p-8">{children}</div>
      </AccordionDetails>
    </Accordion>
  );
}
