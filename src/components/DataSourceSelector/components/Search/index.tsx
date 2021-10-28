import { InputField } from "@dhis2/ui";
import React from "react";

export default function DataSourceSearch({ keyword, setSearchKeyword }: { keyword?: string; setSearchKeyword: any }) {
  return (
    <div className="pt-8 pb-8 ">
      <InputField placeholder="Search" type="text" value={keyword} name="keyword" onChange={({ value }: { value: string }) => setSearchKeyword(value)} />
    </div>
  );
}
