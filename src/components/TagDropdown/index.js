import React, { useState } from "react";
import { Select } from "antd";

//start of component render
function TagDropdown({ data, searchFunction, searchWeek }) {
  const [dataOptions] = useState(data);

  if (!dataOptions) {
    return <Select loading></Select>;
  } else
    return (
      <Select
        value={searchWeek}
        defaultValue={dataOptions[0].key}
        style={{ width: 120 }}
        onChange={(value) => searchFunction(value)}
      >
        {dataOptions}
      </Select>
    );
}
export default TagDropdown;
