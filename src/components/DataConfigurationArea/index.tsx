import { find } from "lodash";
import React from "react";
import CustomAccordion from "./components/CustomAccordion";
import DataSource from "./components/DataSource";

export interface DataConfigurationAreaItemProps {
  id: string;
  name: string;
  icon?: React.ReactNode;
  subLabel?: string;
}

export interface DataConfigurationAreaGroupProps {
  id: string;
  name: string;
  items: Array<DataConfigurationAreaItemProps>;
}

export interface DataConfigurationAreaProps {
  groups: Array<DataConfigurationAreaGroupProps>;
  onItemClick: (groupId: string, itemId: string) => void;
  editableTitle?: boolean;
  onGroupTitleEdit?: (groupId: string, value: string) => void;
  deletableGroups?: boolean;
  onGroupDelete?: (groupId: string) => void;
  deletableItems?: boolean;
  onItemDelete?: (groupId: string, itemId: string) => void;
  groupFooter?: (group: DataConfigurationAreaGroupProps, index: number) => React.ReactNode;
  draggableItems?: boolean;
  onItemDragEnd?: (groupId: string, result: { source: { index: number }; destination: { index: number } }) => void;
  selectedItems?: Array<{ groupId: string; itemId: string }>;
  titleRightAdornment?: (props: { id: string }) => React.ReactNode;
}

export default function DataConfigurationArea({
  groups,
  onItemClick,
  editableTitle,
  onGroupTitleEdit,
  deletableGroups,
  onGroupDelete,
  onItemDelete,
  deletableItems,
  groupFooter,
  draggableItems,
  onItemDragEnd,
  selectedItems,
  titleRightAdornment,
}: DataConfigurationAreaProps) {
  return (
    <div className="column">
      {groups.map(({ id: groupId, name, items }, groupIndex) => (
        <CustomAccordion
          draggableChildren={draggableItems}
          onDragEnd={(result) => {
            if (onItemDragEnd) {
              onItemDragEnd(groupId, result);
            }
          }}
          onDelete={onGroupDelete}
          deletable={deletableGroups}
          onTitleChange={onGroupTitleEdit}
          editableTitle={editableTitle}
          key={`${groupId}-accordion`}
          id={groupId}
          title={name}
          titleRightAdornment={titleRightAdornment}>
          <div className="column" style={{ gap: 16 }}>
            {items?.map((item, index) => (
              <DataSource
                index={index}
                draggable={draggableItems}
                subLabel={item.subLabel}
                icon={item.icon}
                deletable={deletableItems}
                onDelete={(id: string) => onItemDelete && onItemDelete(groupId, id)}
                onClick={(itemId) => onItemClick(groupId, itemId)}
                key={`${item.id}-item`}
                id={item.id}
                label={item.name}
                selected={Boolean(find(selectedItems, (selectedItem) => selectedItem.groupId === groupId && selectedItem.itemId === item.id))}
              />
            ))}
            <div>{groupFooter ? groupFooter({ id: groupId, name, items }, groupIndex) : null}</div>
          </div>
        </CustomAccordion>
      ))}
    </div>
  );
}

export { DataSource as DataConfigurationAreaItem, CustomAccordion as DataConfigurationAreaGroup };
