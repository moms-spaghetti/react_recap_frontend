import React, { useState } from "react";
import { Button, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import CmsMenu from "../CoachCMSMenu";

const CmsDropdown = ({
  toggleTagDisplay,
  toggleLecturerDisplay,
  switchVideoMode,
  modeSelector,
  updateVideoSelectPageOutput,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleVisible = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <Dropdown
      overlay={
        <CmsMenu
          toggleTagDisplay={toggleTagDisplay}
          toggleLecturerDisplay={toggleLecturerDisplay}
          toggleVisible={toggleVisible}
          switchVideoMode={switchVideoMode}
          modeSelector={modeSelector}
          updateVideoSelectPageOutput={updateVideoSelectPageOutput}
        />
      }
      visible={dropdownVisible}
      onVisibleChange={toggleVisible}
      trigger="click"
    >
      <Button size="middle" type="primary" block>
        <MenuOutlined />
        Tools
      </Button>
    </Dropdown>
  );
};

export default CmsDropdown;
