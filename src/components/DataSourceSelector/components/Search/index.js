import { InputField } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";

export default function DataSourceSearch({ keyword, setSearchKeyword }) {
  return (
    <div className="pt-8 pb-8 ">
      <InputField
        placeholder="Search"
        type="text"
        value={keyword}
        name="keyword"
        onChange={({ value }) => setSearchKeyword(value)}
      />
    </div>
  );
}

DataSourceSearch.propTypes = {
  setSearchKeyword: PropTypes.func.isRequired,
  keyword: PropTypes.string,
};
