import i18n from "@dhis2/d2-i18n";
import { CssReset } from "@dhis2/ui";
import React, { Suspense } from "react";
import SingleValueItem from "./components/SingleValueItem/SingleValueItem";
import styles from "./styles/SingleValueContainer.module.css";
import { SingleValue, SingleValueContainerProps } from "./types/props";

export default function SingleValueContainer({ title, singleValueItems, animationDuration, animationDelay }: SingleValueContainerProps): React.ReactElement {
  return (
    <div className="w-100 h-100">
      <CssReset />
      <Suspense fallback={<div>{i18n.t("Loading ...")}</div>}>
        <div>
          <span className={`${styles["font-x-large"]} ${styles["font-bold"]}`}>{title}</span>
          <div className={styles["single-value-list"]}>
            {singleValueItems.map((singleValueItem: SingleValue) => (
              <SingleValueItem
                key={`${singleValueItem.label}-${singleValueItem.value}`}
                {...singleValueItem}
                globalAnimationDuration={animationDuration}
                globalAnimationDelay={animationDelay}
              />
            ))}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
export { SingleValueItem };
