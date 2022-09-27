import { hcl } from "d3-color";
import { isString } from "lodash";
import { COLOR_PALETTES } from "../constants/colors";

const colorbrewer: Record<string, any> = COLOR_PALETTES;

// Returns a color brewer scale for a number of classes
export const getColorPalette = (scale: string, classes: number) => {
  return colorbrewer[scale][classes];
};

// Returns color scale name for a palette
export const getColorScale = (palette: string) => {
  const classes = palette.split(",").length;
  return colorScales.find((name) => colorbrewer[name][classes].join(",") === palette);
};

export const defaultColorScaleName = "YlOrBr";
export const defaultClasses = 5;
export const defaultColorScale = getColorPalette(defaultColorScaleName, defaultClasses);

// Correct colors not adhering to the css standard (add missing #)
export const cssColor = (color: any) => {
  if (!isString(color)) {
    return color;
  } else if (color === "##normal") {
    // ##normal is used in old map favorites
    return null; // Will apply default color
  }
  return (/(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(color) ? "#" : "") + color;
};

// Returns an unique color (first from an array, then random but still unique)
export const getUniqueColor = (defaultColors: any) => {
  const colors = [...defaultColors];

  function randomColor(): string {
    const color = "#000000".replace(/0/g, () => (~~(Math.random() * 16)).toString(16));

    // Recursive until color is unique
    if (colors.includes(color)) {
      return randomColor();
    }

    colors.push(color);

    return color;
  }

  return (index: number) => colors[index] || randomColor();
};

// Returns true if a color is dark
export const isDarkColor = (color: string) => hcl(color).l < 70;

// Returns constrasting color
export const getContrastColor = (color: string) => (isDarkColor(color) ? "#fff" : "#000");
export type LegendColorScale = typeof colorScales[number];
export const colorScales = [
  "YlOrBr",
  "Reds",
  "YlGn",
  "Greens",
  "Blues",
  "BuPu",
  "RdPu",
  "PuRd",
  "Greys",
  "YlOrBr_reverse",
  "Reds_reverse",
  "YlGn_reverse",
  "Greens_reverse",
  "Blues_reverse",
  "BuPu_reverse",
  "RdPu_reverse",
  "PuRd_reverse",
  "Greys_reverse",
  "PuOr",
  "BrBG",
  "PRGn",
  "PiYG",
  "RdBu",
  "RdGy",
  "RdYlBu",
  "Spectral",
  "RdYlGn",
  "Paired",
  "Pastel1",
  "Set1",
  "Set3",
];
