import { IconChevronDown24 } from "@dhis2/ui";
import React, { useCallback } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import GroupTitle from "./components/GroupTitle";
import { Accordion, AccordionDetails, AccordionSummary } from "./components/MUIAccordion";

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
                                          defaultExpanded
                                        }: CustomAccordionProps) {
  const [expand, setExpanded] = React.useState(defaultExpanded);

  const onExpand = useCallback(
    () => {
      setExpanded(prevState => !prevState);
    },
    []
  );


  return (
    <Accordion
      style={{ width: "100%" }}
      defaultExpanded={defaultExpanded}
      expanded={expand}
      onChange={() => {
        setExpanded(prevState => !prevState);
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
        <div className="column h-100 w-100 gap-8 p-8">
          {draggableChildren && onDragEnd ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="column h-100 w-100">
                <Droppable droppableId={id}>
                  {(provided) => (
                    <>
                      <div
                        className="w-100"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {children}
                        {provided.placeholder}
                      </div>

                    </>
                  )}

                </Droppable>
              </div>
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
