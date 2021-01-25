import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import socLogo from "../../images/recap_logo.svg";
import app from "../../firebase/Base";
import { AuthContext } from "../../firebase/Auth";
import ContentManagementLink from "../ContentManagementLink";
import { Input, Space, Row, Button } from "antd";
import { SearchContext } from "../../contexts/searchContext";
import "./style.css";

const { Search } = Input; //imports Search from ant.d
function HeaderBar() {
  const { isAdmin } = useContext(AuthContext);
  const currentPage = useLocation().pathname;

  const {
    getSearchText,
    getSearchTags,
    getSearchWeek,
    getSearchLecturer,
    setTagState,
    searchText,
  } = useContext(SearchContext);

  return (
    <Row
      style={{
        height: "120px",
        backgroundColor: "#f2f2f2",
        marginBottom: "32px",
        boxShadow: "0px 3px 15px -5px rgba(140,140,140,1)",
      }}
      align="middle"
      justify="space-between"
    >
      <Space>
        <Link to="/">
          <img
            src={socLogo}
            alt="logo"
            style={{ marginLeft: "32px", height: "80px" }}
          />
        </Link>
        {currentPage !== "/" ? (
          <Search
            placeholder="search title and description"
            onSearch={(e) => getSearchText(e)}
            style={{ width: "250px" }}
            defaultValue={searchText}
          />
        ) : (
          //
          <></>
        )}
      </Space>
      <Space style={{ marginRight: "32px", userSelect: "none" }} size="large">
        <Link className="header-bar-links" to="/" style={{ color: "#000" }}>
          Home
        </Link>

        {isAdmin ? <ContentManagementLink /> : <></>}

        <Button
          type="primary"
          onClick={() => {
            getSearchText("");
            getSearchTags([]);
            getSearchWeek("All Weeks");
            getSearchLecturer("All Lecturers");
            setTagState({
              selectedTags: [],
            });
            app.auth().signOut();
          }}
        >
          Log Out
        </Button>
      </Space>
    </Row>
  );
}
export default HeaderBar;
