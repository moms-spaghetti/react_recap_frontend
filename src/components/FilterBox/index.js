import React, { useState, useEffect, useContext } from "react";
import { Button, Select, Tag, Space, Row, Skeleton, Input } from "antd";
import { SearchContext } from "../../contexts/searchContext";
import config from "../../config";
import TagSkeleton from "../Skeletons/Tags";

const { CheckableTag } = Tag;
const { Option } = Select;
const { Search } = Input;

function FilterBox() {
  const [lecturerData, setLecturerData] = useState();
  const [weekData, setWeekData] = useState();
  const [tagData, setTagData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLecturerData = async () => {
      const resLecturer = await fetch(config.BACKEND_URL_FILTERS_GET_LECTURER);
      const dataLecturer = await resLecturer.json();
      const optionsLecturer = dataLecturer.map((lecturer) => (
        <Option key={lecturer}>{lecturer}</Option>
      ));
      optionsLecturer.unshift(
        <Option key={"All Lecturers"}>{"All Lecturers"}</Option>
      );
      setLecturerData(optionsLecturer);
    };

    if (!lecturerData) {
      getLecturerData();
    }

    const getWeekData = async () => {
      const resWeek = await fetch(config.BACKEND_URL_FILTERS_GET_WEEK);
      const dataWeek = await resWeek.json();
      const optionsWeek = dataWeek.map((week) => (
        <Option key={week}>{`Week ${week}`}</Option>
      ));
      optionsWeek.unshift(<Option key={"All Weeks"}>{"All Weeks"}</Option>);
      setWeekData(optionsWeek);
    };

    if (!weekData) {
      getWeekData();
    }

    const getTagData = async () => {
      const resTag = await fetch(config.BACKEND_URL_FILTERS_GET_TAGS);
      const dataTag = await resTag.json();
      setTagData(dataTag);
    };
    if (!tagData) {
      getTagData();
    }

    if ((lecturerData, weekData, tagData)) {
      setLoading(false);
    }
  }, [lecturerData, weekData, tagData]);

  const {
    getSearchTags,
    getSearchWeek,
    getSearchLecturer,
    searchLecturer,
    searchWeek,
    setTagState,
    tagState,
    handleTagChange,
    getSearchText,
    searchText,
  } = useContext(SearchContext);

  return (
    <Space direction="vertical" style={{ height: "100vh" }}>
      <Space direction="vertical">
        {!loading ? (
          <Search
            placeholder="search title and description"
            allowClear={true}
            onChange={(e) => getSearchText(e.target.value)}
            style={{ width: "250px" }}
            value={searchText}
          />
        ) : (
          <Skeleton.Input active style={{ width: "250px" }} />
        )}
        {!loading ? (
          <Select
            value={searchWeek}
            defaultValue={searchWeek}
            style={{ width: "250px" }}
            onChange={(value) => getSearchWeek(value)}
          >
            {weekData}
          </Select>
        ) : (
          <Skeleton.Input active style={{ width: "250px" }} />
        )}

        {!loading ? (
          <Select
            value={searchLecturer}
            defaultValue={searchLecturer}
            style={{ width: "250px" }}
            onChange={(value) => getSearchLecturer(value)}
          >
            {lecturerData}
          </Select>
        ) : (
          <Skeleton.Input
            active
            style={{ width: "250px", marginBottom: "1em" }}
          />
        )}
      </Space>
      <Row style={{ width: "250px" }}>
        {!loading ? (
          tagData.map((tag) => (
            <CheckableTag
              key={tag}
              checked={tagState.selectedTags.indexOf(tag) > -1}
              onChange={(checked) => {
                handleTagChange(tag, checked);
              }}
              style={{
                border: "1px solid #1890ff",
                padding: "3px 5px",
                margin: "3px",
                fontSize: ".9em",
                userSelect: "none",
              }}
            >
              {tag}
            </CheckableTag>
          ))
        ) : (
          <TagSkeleton count={30} />
        )}
      </Row>
      {!loading ? (
        <Button
          type="primary"
          onClick={() => {
            setTagState({
              selectedTags: [],
            });
            getSearchTags([]);
          }}
        >
          Clear Tags
        </Button>
      ) : (
        <Skeleton.Button active style={{ width: "100px" }} />
      )}
      {!loading ? (
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
          }}
        >
          Reset Search
        </Button>
      ) : (
        <Skeleton.Button active style={{ width: "100px" }} />
      )}
    </Space>
  );
}

export default FilterBox;
