import i18n from "@dhis2/d2-i18n";
import { FlyoutMenu, IconMore24, Menu, MenuDivider, MenuItem, Popover } from "@dhis2/ui";
import { IconButton } from "@material-ui/core";
import HighchartsReact from "highcharts-react-official";
import React, { useRef, useState } from "react";
import { onCSVDownload, onFullScreenView, onImageDownload, onPDFDownload, onViewAsTable } from "../../services/export";

function ChartMenu({ menuRef, onClick, onClose }: { menuRef: HTMLButtonElement; onClick: (action: string) => void; onClose: () => void }) {
  const onMenuClick = (action: string) => () => {
    onClick(action);
    onClose();
  };

  return (
    <Popover onClose={onClose} reference={menuRef}>
      <FlyoutMenu>
        <Menu>
          <MenuItem dataTest={"download-png"} label={i18n.t("Download PNG")} onClick={onMenuClick("png")} />
          <MenuItem dataTest={"download-jpeg"} label={i18n.t("Download JPEG")} onClick={onMenuClick("jpeg")} />
          <MenuItem label={i18n.t("Download SVG")} onClick={onMenuClick("svg")} />
          <MenuDivider />
          <MenuItem label={i18n.t("Download CSV")} onClick={onMenuClick("csv")} />
          <MenuItem dataTest={"download-pdf"} label={i18n.t("Download PDF")} onClick={onMenuClick("pdf")} />
          <MenuDivider />
          <MenuItem label={i18n.t("View data table")} onClick={onMenuClick("table")} />
          <MenuItem label={i18n.t("View full screen")} onClick={onMenuClick("full-screen")} />
        </Menu>
      </FlyoutMenu>
    </Popover>
  );
}

function ChartDownloadMenu({ chartRef }: { chartRef: HighchartsReact.RefObject | null }) {
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const [menuRef, setMenuRef] = useState<HTMLButtonElement | null>(null);
  const toggleMenu = () => {
    if (menuRef === null) {
      setMenuRef(menuButtonRef.current);
    } else {
      setMenuRef(null);
    }
  };

  const chart = chartRef;

  const onMenuClick = (action: string) => {
    console.log(chart);
    if (chart) {
      switch (action) {
        case "png":
          onImageDownload(chart, "png");
          break;
        case "jpeg":
          onImageDownload(chart, "jpeg");
          break;
        case "svg":
          onImageDownload(chart, "svg+xml");
          break;
        case "csv":
          onCSVDownload(chart);
          break;
        case "pdf":
          onPDFDownload(chart);
          break;
        case "table":
          onViewAsTable(chart, true);
          break;
        case "full-screen":
          onFullScreenView(chart);
          break;
      }
    }
  };

  return (
    <>
      <IconButton onClick={toggleMenu} ref={menuButtonRef}>
        <IconMore24 />
      </IconButton>
      {menuRef && <ChartMenu onClick={onMenuClick} onClose={toggleMenu} menuRef={menuRef} />}
    </>
  );
}

export default ChartDownloadMenu;
