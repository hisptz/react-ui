import i18n from "@dhis2/d2-i18n";
import React from "react";
// @ts-ignore

export default function HelloWorld() {
  return <h1>{i18n.t("Hello World!")}</h1>;
}
