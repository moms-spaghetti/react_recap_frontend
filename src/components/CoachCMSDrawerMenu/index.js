import React, { useState } from "react";
import { Drawer, Button, Space, Switch } from "antd";
import { MenuOutlined, UserOutlined, TagOutlined } from "@ant-design/icons";

const DrawerToolsMenu = ({
  modeSelector,
  toggleTagDisplay,
  toggleLecturerDisplay,
  updateVideoSelectPageOutput,
  switchVideoMode,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const showMenu = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <>
      <Button onClick={showMenu} type="primary" icon={<MenuOutlined />}>
        Tools
      </Button>
      <Drawer
        title="Tools"
        placement="left"
        onClose={showMenu}
        visible={showDrawer}
        closable={false}
        style={{ opacity: "0.95" }}
        width={295}
      >
        <Space direction="vertical">
          <Space style={{ marginBottom: "7px" }}>
            <Switch
              size="small"
              style={{ marginBottom: "2px", marginLeft: "14px" }}
              onChange={() => {
                updateVideoSelectPageOutput(false);
                switchVideoMode(!modeSelector);
              }}
            />
            {modeSelector ? `Vimeo Selector Mode` : "re:cap Editor Mode"}
          </Space>
          <Button
            type="link"
            icon={<TagOutlined />}
            onClick={() => {
              showMenu();
              toggleTagDisplay();
            }}
          >
            Tag Editor
          </Button>
          <Button
            type="link"
            icon={<UserOutlined />}
            onClick={() => {
              showMenu();
              toggleLecturerDisplay();
            }}
          >
            Lecturer Editor
          </Button>
        </Space>
      </Drawer>
    </>
  );
};

export default DrawerToolsMenu;
