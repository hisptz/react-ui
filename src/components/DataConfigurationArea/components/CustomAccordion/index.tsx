import { IconChevronDown24 } from "@dhis2/ui";
import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
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
  draggableChildren?: boolean;
  onDragEnd?: (result: any) => void;
  onTitleChange?: (id: string, title: string) => void;
  onExpand?: (id: string, expanded: boolean) => void;
  titleRightAdornment?: React.ReactNode;
}

export default function CustomAccordion({
  id,
  title,
  children,
  editableTitle,
  onTitleChange,
  deletable,
  onDelete,
  onExpand,
  onDragEnd,
  draggableChildren,
  titleRightAdornment,
}: CustomAccordionProps) {
  return (
    <Accordion
      style={{ width: "100%" }}
      onChange={(event, expanded) => {
        if (onExpand) {
          onExpand(id, expanded);
        }
      }}>
      <AccordionSummary expandIcon={<IconChevronDown24 />}>
        <GroupTitle
          rightAdornment={titleRightAdornment}
          id={id}
          title={title}
          editable={editableTitle}
          onEdit={onTitleChange}
          deletable={deletable}
          onDelete={onDelete}
          onExpand={onExpand}
        />
      </AccordionSummary>
      <AccordionDetails>
        {draggableChildren && onDragEnd ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="column h-100 w-100 p-8">
              <Droppable droppableId={id}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {children}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        ) : (
          <div className="column h-100 w-100 p-8">{children}</div>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
