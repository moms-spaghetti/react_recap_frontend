import React from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  TagOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const CmsMenu = ({
  toggleTagDisplay,
  toggleVisible,
  toggleLecturerDisplay,
  switchVideoMode,
  modeSelector,
  updateVideoSelectPageOutput,
}) => {
  return (
    <Menu
      style={{
        userSelect: "none",
        textAlign: "center",
        opacity: "0.93",
        fontWeight: "bold",
      }}
    >
      <Menu.Item
        key="1"
        icon={<TagOutlined />}
        onClick={() => {
          toggleVisible();
          toggleTagDisplay();
        }}
      >
        Tag Editor
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<UserOutlined />}
        onClick={() => {
          toggleVisible();
          toggleLecturerDisplay();
        }}
      >
        Lecturer Editor
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<VideoCameraOutlined />}
        onClick={() => {
          toggleVisible();
          updateVideoSelectPageOutput(false);
          switchVideoMode(!modeSelector);
        }}
      >
        {modeSelector
          ? "Switch to re:cap Video Editor"
          : "Switch to Vimeo Video Selector"}
      </Menu.Item>
    </Menu>
  );
};

export default CmsMenu;
