import i18n from "@dhis2/d2-i18n";
import { IconChevronDown24, Tooltip } from "@dhis2/ui";
import React from "react";
import GroupTitle from "./components/GroupTitle";
import { Accordion, AccordionDetails, AccordionSummary } from "./components/MUIAccordion";

export interface CustomAccordionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  expanded: string;
  editableTitle?: boolean;
  deletable?: boolean;
  onDelete?: (id: string) => void;
  onTitleChange?: (id: string, title: string) => void;
}

export default function CustomAccordion({ id, title, children, expanded, editableTitle, onTitleChange, deletable, onDelete }: CustomAccordionProps) {
  return (
    <Accordion>
      <Tooltip
        content={i18n.t("Click to {{action}}, drag to rearrange", {
          action: expanded === id ? i18n.t("collapse") : i18n.t("expand"),
        })}>
        <AccordionSummary expandIcon={<IconChevronDown24 />}>
          <GroupTitle id={id} title={title} editable={editableTitle} onEdit={onTitleChange} deletable={deletable} onDelete={onDelete} />
        </AccordionSummary>
      </Tooltip>
      <AccordionDetails>
        <div className="column h-100 w-100 p-16">{children}</div>
      </AccordionDetails>
    </Accordion>
  );
}
