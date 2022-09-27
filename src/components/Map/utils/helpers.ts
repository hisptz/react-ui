// Get the longest text length from an object property in an array
import L from "leaflet";

export const getLongestTextLength = (array: Array<any>, key: string | number) =>
  array.reduce((text, curr) => (curr[key] && String(curr[key]).length > text.length ? String(curr[key]) : text), "").length;

export function getIconUrl({ type, icon }: { icon: string; type: string }, { baseUrl }: { baseUrl: string }) {
  return `${baseUrl}/images/orgunitgroup/${icon ?? "01.png"}`;
}

export function getIcon(url: string): L.Icon | undefined {
  return new L.Icon({
    iconUrl: url,
  });
}
