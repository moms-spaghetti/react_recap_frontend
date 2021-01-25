import React from "react";
import { Skeleton } from "antd";

const TagSkeleton = ({ ...props }) => {
  const tagSkeletons = [];
  for (let i = 0; i < (props.count || 1); i++) {
    tagSkeletons.push(
      <Skeleton.Button
        active
        style={{
          marginRight: "1em",
          marginBottom: "0.5em",
          width: Math.random() * (90 - 150) + 100,
        }}
      />
    );
  }
  return tagSkeletons;
};

export default TagSkeleton;
