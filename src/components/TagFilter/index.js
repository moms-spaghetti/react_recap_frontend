import React, { useState } from "react";
import { Tag } from "antd";

const { CheckableTag } = Tag;

//start of component render
function TagFilter({ text, data, searchTags }) {
  const [state, setState] = useState({
    selectedTags: [],
  });

  function handleChange(tag, checked) {
    const { selectedTags } = state;

    let nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);

    setState({ selectedTags: nextSelectedTags });
    searchTags(nextSelectedTags);
  }

  return (
    <>
      <div className="filter-group">
        {data.map((tag) => (
          <CheckableTag
            key={tag}
            checked={state.selectedTags.indexOf(tag) > -1}
            onChange={(checked) => {
              handleChange(tag, checked);
            }}
            style={{
              border: "1px solid #1890ff",
              padding: "5px",
              margin: "3px",
              fontSize: ".9em",
              borderRadius: "10px",
            }}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
    </>
  );
}
export default TagFilter;
