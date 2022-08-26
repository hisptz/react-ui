import { atom } from "recoil";
import { dataSourceTypes } from "../Utils/Models";

export const dataSourcesTopBar = atom({
  key: "dataSourcesTopBar",
  default: [],
});

export const searchKeywordTopBar = atom({
  key: "searchKeywordTopBar",
  default: "",
});

export const selectedRadioSearchTopBar = atom({
  key: "selectedRadioSearchTopBar",
  default: dataSourceTypes.DATA_ELEMENT,
});
