import { hcl } from "d3-color";

// Returns true if a color is dark
export const isDarkColor = (color: string) => hcl(color).l < 70;

// Returns constrasting color
export const getContrastColor = (color: string) => (isDarkColor(color) ? "#fff" : "#000");
