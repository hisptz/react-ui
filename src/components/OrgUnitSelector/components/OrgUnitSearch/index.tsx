import i18n from "@dhis2/d2-i18n";
import { InputField } from "@dhis2/ui";
import { debounce } from "lodash";
import React, { useCallback, useRef, useState } from "react";
import { useFilterOrgUnits } from "../../hooks";

export function OrgUnitSearch({ searchable }: { searchable?: boolean }) {
  const [keyword, setKeyword] = useState<string | undefined>();
  const { onSearch } = useFilterOrgUnits();
  const search = useRef(onSearch ? debounce(onSearch, 500) : null);

  const onSearchChange = useCallback(
    ({ value }: { value: string }) => {
      setKeyword(value);
      search.current?.(value);
    },
    [search]
  );

  return (
    <>
      {searchable && (
        <div className="pb-8">
          <InputField value={keyword} onChange={onSearchChange} dense placeholder={i18n.t("Search name, id")} />
        </div>
      )}
    </>
  );
}
