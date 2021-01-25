import React from "react";
import { Card } from "antd";
import "./card.css";

const CardSkeleton = ({ ...props }) => {
  const cardSkeletons = [];

  for (let i = 0; i < (props.count || 1); i++) {
    cardSkeletons.push(
      <li
        key={`skeleton-card-${i}`}
        style={{
          padding: "0",
          listStyle: "none",
          minWidth: props.minWidth || "150px",
          maxWidth: props.maxWidth || "600px",
          marginRight: "1.5em",
          marginBottom: "3em",
        }}
      >
        <Card
          loading
          bodyStyle={{ padding: "3px 3px" }}
          bordered={false}
          cover={<div className="skeleton-card-image"></div>}
        />
      </li>
    );
  }

  return cardSkeletons;
};

export default CardSkeleton;
