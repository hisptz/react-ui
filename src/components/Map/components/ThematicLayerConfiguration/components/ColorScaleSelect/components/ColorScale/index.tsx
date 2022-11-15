import React from "react";
import styles from "../../styles/ColorScale.module.css";
import { COLOR_PALETTES } from "../../constants/colors";

// Returns one color scale based on a code and number of classes
const ColorScale = ({ scale, bins, width, onClick }: { scale: string; bins: number; width: number; onClick: (scale: string) => void }) => {
  const colors = (COLOR_PALETTES as any)?.[scale]?.[bins];
  const itemWidth = width ? width / bins : 36;

  return (
    <ul
      onClick={() => onClick(scale)}
      className={styles.colorScale}
      style={{
        ...(width && { width }),
      }}>
      {colors.map((color: string, index: number) => (
        <li key={index} className={styles.item} style={{ backgroundColor: color, width: itemWidth }} />
      ))}
    </ul>
  );
};

export default ColorScale;
