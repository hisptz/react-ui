import React, { Fragment, useRef, useState } from "react";
import { Popover } from "@dhis2/ui";
import cx from "classnames";
import ColorScale from "./components/ColorScale";
import styles from "./styles/ColorScaleSelect.module.css";
import { colorScales, defaultColorScale, defaultColorScaleName, getColorPalette, getColorScale } from "./utils/colors";

const ColorScaleSelect = ({
  colorClass,
  count,
  width,
  onChange,
  className,
}: {
  className?: string;
  count: number;
  width: number;
  onChange: (palette: string) => void;
  colorClass: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const palette = getColorPalette(colorClass, count);
  const bins = palette.split(",").length;
  const scale = getColorScale(palette) ?? defaultColorScale;

  const onColorScaleSelect = (scale: string) => {
    onChange(scale);
    setIsOpen(false);
  };

  return (
    <Fragment>
      <div ref={anchorRef} className={cx(styles.colorScale, className)}>
        <ColorScale bins={bins} scale={scale ?? defaultColorScaleName} onClick={() => setIsOpen(true)} width={width || 260} />
      </div>
      {isOpen && (
        <Popover reference={anchorRef} arrow={false} placement="right" onClickOutside={() => setIsOpen(false)}>
          <div className={styles.popover} style={{ width: width + 24 || 260, height: "100%", overflow: "auto" }}>
            {colorScales.map((scale, index) => (
              <ColorScale key={index} scale={scale} bins={bins} onClick={onColorScaleSelect} width={width || 260} />
            ))}
          </div>
        </Popover>
      )}
    </Fragment>
  );
};

export default ColorScaleSelect;
