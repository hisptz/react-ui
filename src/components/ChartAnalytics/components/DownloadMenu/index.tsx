import { IconMore24 } from "@dhis2/ui";
import { IconButton } from "@material-ui/core";
import HighchartsReact from "highcharts-react-official";
import React, { useRef, useState } from "react";
import { onCSVDownload, onFullScreenView, onImageDownload, onPDFDownload, onViewAsTable } from "../../services/export";
import { ChartMenu } from "./components/Menu";
import { ChartExportMenuItem } from "./interfaces/menu";

function ChartDownloadMenu({ chartRef, exclude }: { chartRef: HighchartsReact.RefObject | null; exclude?: ChartExportMenuItem[] }) {
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
      {menuRef && <ChartMenu exclude={exclude} onClick={onMenuClick} onClose={toggleMenu} menuRef={menuRef} />}
    </>
  );
}

export default ChartDownloadMenu;
