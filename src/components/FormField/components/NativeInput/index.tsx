import { InputField } from "@dhis2/ui";
import React from "react";

export default function NativeInput(props: any, ref: React.Ref<any>) {

  return (
    <InputField
      {...props}
      ref={ref}
    />
  );
}
