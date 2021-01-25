import React from "react";
import { Descriptions } from "antd";
import moment from "moment";

const DescriptionBox = ({ width, data, modeSelector }) => {
  return (
    <Descriptions
      title="Video Info"
      size="small"
      column={1}
      style={{ width: width }}
    >
      <Descriptions.Item label="Title">
        {modeSelector ? data.name : data.title}
      </Descriptions.Item>
      <Descriptions.Item label="Created">
        {moment(modeSelector ? data.created_time : data.lecture_date).format(
          "DD MMM YYYY"
        )}
      </Descriptions.Item>
      <Descriptions.Item label="URL">
        {modeSelector ? data.link : data.video_url}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default DescriptionBox;
