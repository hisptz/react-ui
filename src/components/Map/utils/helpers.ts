// Get the longest text length from an object property in an array
export const getLongestTextLength = (array: Array<any>, key: string | number) =>
  array.reduce((text, curr) => (curr[key] && String(curr[key]).length > text.length ? String(curr[key]) : text), "").length;
