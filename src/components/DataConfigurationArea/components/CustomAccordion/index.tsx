import { IconChevronDown24 } from "@dhis2/ui";
import { isEmpty } from "lodash";
import React, { useCallback, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import classes from "../../DataConfiguration.module.css";
import GroupTitle from "./components/GroupTitle";
import { Accordion, AccordionDetails, AccordionSummary } from "./components/MUIAccordion";
import { dragStart, dragUpdate } from "./services/dnd";

export interface CustomAccordionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  editableTitle?: boolean;
  deletable?: boolean;
  onDelete?: (id: string) => void;
  draggableChildren?: boolean;
  onDragEnd?: (result: any) => void;
  onTitleChange?: (id: string, title: string) => void;
  titleRightAdornment?: (props: { id: string }) => React.ReactNode | null;
  defaultExpanded?: boolean;
}

export default function CustomAccordion({
  id,
  title,
  children,
  editableTitle,
  onTitleChange,
  deletable,
  onDelete,

  onDragEnd,
  draggableChildren,
  footer,
  titleRightAdornment,
  defaultExpanded,
}: CustomAccordionProps) {
  const [expand, setExpanded] = useState(defaultExpanded);
  const [placeholderStyle, setPlaceholderStyle] = useState<any>({});

  const onExpand = useCallback(() => {
    setExpanded((prevState) => !prevState);
  }, []);

  const onDragStart = (event: any) => {
    setPlaceholderStyle(dragStart(event));
  };

  const onDragUpdate = (event: any) => {
    setPlaceholderStyle(dragUpdate(event));
  };

  return (
    <Accordion
      style={{ width: "100%" }}
      defaultExpanded={defaultExpanded}
      expanded={expand}
      onChange={() => {
        setExpanded((prevState) => !prevState);
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
        <div className="column h-100 w-100">
          {draggableChildren && onDragEnd ? (
            <DragDropContext onDragUpdate={onDragUpdate} onDragStart={onDragStart} onDragEnd={onDragEnd}>
              <Droppable droppableId={id}>
                {(provided, snapshot) => (
                  <>
                    <div className="w-100" ref={provided.innerRef} {...provided.droppableProps} style={{ position: "relative" }}>
                      {children}
                      {provided.placeholder}
                      {!isEmpty(placeholderStyle) && snapshot.isDraggingOver && <div className={classes["dnd-placeholder"]} style={{ ...placeholderStyle }} />}
                    </div>
                  </>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <div className="column h-100 w-100">{children}</div>
          )}
          {footer}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
