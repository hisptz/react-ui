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
  groupFooter?: React.ReactNode;
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
}: DataConfigurationAreaProps) {
  return (
    <div className={"column"}>
      {groups.map(({ id: groupId, name, items }) => (
        <CustomAccordion
          onDelete={onGroupDelete}
          deletable={deletableGroups}
          onTitleChange={onGroupTitleEdit}
          editableTitle={editableTitle}
          key={`${groupId}-accordion`}
          id={groupId}
          title={name}>
          <div className="column " style={{ gap: 16 }}>
            {items?.map((item) => (
              <DataSource
                subLabel={item.subLabel}
                icon={item.icon}
                deletable={deletableItems}
                onDelete={(id: string) => onItemDelete && onItemDelete(groupId, id)}
                onClick={(itemId) => onItemClick(groupId, itemId)}
                key={`${item.id}-item`}
                id={item.id}
                label={item.name}
                selected={false}
              />
            ))}
            <div>{groupFooter}</div>
          </div>
        </CustomAccordion>
      ))}
    </div>
  );
}

export { DataSource as DataConfigurationAreaItem, CustomAccordion as DataConfigurationAreaGroup };
