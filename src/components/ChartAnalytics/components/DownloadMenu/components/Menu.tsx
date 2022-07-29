import { FlyoutMenu, Menu, MenuDivider, MenuItem, Popover } from "@dhis2/ui";
import { isEmpty, map } from "lodash";
import React from "react";
import { chartMenuSections } from "../constants/menu";
import { ChartExportMenuItem } from "../interfaces/menu";

export function ChartMenu({
  menuRef,
  onClick,
  onClose,
  exclude = [],
}: {
  menuRef: HTMLButtonElement;
  onClick: (action: string) => void;
  onClose: () => void;
  exclude?: ChartExportMenuItem[];
}) {
  const onMenuClick = (action: string) => () => {
    onClick(action);
    onClose();
  };

  const menuSections = map(chartMenuSections, (section) => {
    return {
      ...section,
      menuItems: section.menuItems.filter((item: any) => !exclude.includes(item.name)),
    };
  }).filter((section) => !isEmpty(section.menuItems));

  return (
    <Popover onClickOutside={onClose} onClose={onClose} reference={menuRef}>
      <FlyoutMenu>
        <Menu>
          {menuSections?.map((section, index) => {
            return (
              <>
                {section.menuItems?.map(({ name, label }) => {
                  return <MenuItem key={`${name}-menu-item`} dataTest={`download-${name}`} label={label} onClick={onMenuClick(name)} />;
                })}
                {index !== menuSections.length - 1 && <MenuDivider />}
              </>
            );
          })}
        </Menu>
      </FlyoutMenu>
    </Popover>
  );
}
