import i18n from "@dhis2/d2-i18n";
import React, { Suspense } from "react";
import SingleValueItem from "./components/SingleValueItem/SingleValueItem";
import { SingleValue, SingleValueContainerProps } from "./types/props";
import "./styles/index.css";

export default function SingleValueContainer({ title, singleValueItems }: SingleValueContainerProps): React.ReactElement {
  return (
    <div className="w-100 h-100">
      <Suspense fallback={<div>{i18n.t("Loading ...")}</div>}>
        <div>
          <span className="font-bold font-x-large">{title}</span>
          <div className="single-value-list">
            {singleValueItems.map((singleValueItem: SingleValue) => (
              <SingleValueItem key={`${singleValueItem.label}-${singleValueItem.value}`} {...singleValueItem} />
            ))}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
