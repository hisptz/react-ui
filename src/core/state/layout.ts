import {atom} from "recoil";
import {DEFAULT_LAYOUT} from "@hisptz/scorecard-constants";

const LayoutState = atom({
    key: "cell-analysis-layout",
    default: DEFAULT_LAYOUT,
});

export {LayoutState};
