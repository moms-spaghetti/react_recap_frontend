import React, { useEffect, useState, useContext } from "react";
import { Card, Col, Row, Tag, Select, Pagination, Layout } from "antd";
import { Link } from "react-router-dom";
import { SearchContext } from "../../contexts/searchContext";
import FilterBox from "../FilterBox";
import config from "../../config";
import moment from "moment";
import CardSkeleton from "../Skeletons/Card";

const { CheckableTag } = Tag;
const { Sider, Content } = Layout;

export default function VideoSelectionPage() {
  const [videoData, setVideoData] = useState();
  const { searchUrl } = useContext(SearchContext);

  const { tagState, handleTagChange, paging, setPaging } = useContext(
    SearchContext
  );

  const [total, setTotal] = useState(0);

  //pagination page count + population for pages
  useEffect(() => {
    const getPaginationData = async () => {
      const countRes = await fetch(config.BACKEND_URL_SEARCH_VIDEO_COUNT);
      const countData = await countRes.json();
      setTotal(countData[0].count);

      const pagRes = await fetch(
        config.BACKEND_URL_SEARCH_PAGINATION +
          `position=${paging.position}&paging=${paging.paging}`
      );
      const pagData = await pagRes.json();
      setVideoData(pagData);
    };
    if (!searchUrl) {
      getPaginationData();
    }
  }, [paging]);

  //search for text, tags, weeks, lecturers
  useEffect(() => {
    async function getSearchData() {
      const response = await fetch(config.BACKEND_URL_SEARCH + searchUrl);
      const data = await response.json();
      setVideoData(data);
    }
    if (searchUrl) {
      getSearchData();
    }
  }, [searchUrl]);

  return (
    <Row justify="center">
      <Col span={23}>
        <Layout>
          <Sider width={266} theme="light">
            <FilterBox />
          </Sider>

          <Content style={{ backgroundColor: "#fff" }}>
            {!!!searchUrl && (
              <Pagination
                onChange={(page, pageSize) => {
                  setPaging({ position: page, paging: pageSize });
                }}
                total={total}
                current={paging.position}
                pageSize={paging.paging}
                defaultCurrent={1}
                defaultPageSize={15}
                responsive={true}
                pageSizeOptions={[15, 20, 25]}
                style={{ marginBottom: "8px" }}
                showSizeChanger
              />
            )}
            <ul
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                position: "relative",
                padding: "0",
                listStyle: "none",
              }}
            >
              {videoData ? (
                videoData.map((data) => {
                  return (
                    <li
                      key={data.id}
                      style={{
                        padding: "0",
                        listStyle: "none",
                        minWidth: "150px",
                        maxWidth: "600px",
                        marginRight: "1.5em",
                        marginBottom: "3em",
                      }}
                    >
                      <Card
                        bodyStyle={{ padding: "3px 3px" }}
                        bordered={false}
                        cover={
                          <Link
                            to={`/videoviewer/${data.id}`}
                            style={{ position: "relative" }}
                          >
                            <img
                              alt={data.title}
                              src={data.thumbnail_url}
                              style={{
                                width: "100%",
                                margin: "0px",
                                padding: "0px",
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                right: "0.5em",
                                bottom: "0.5em",
                                color: "#fff",
                                backgroundColor: "#40a9ff",
                                padding: "2px 6px",
                                borderRadius: "3px",
                              }}
                            >{`Week ${data.bootcamp_week}`}</div>
                          </Link>
                        }
                      >
                        <h3 style={{ marginBottom: 0 }}>{data.title}</h3>
                        <p style={{ marginBottom: 10 }}>
                          {data.lecturer} on{" "}
                          {moment(data.lecture_date).format("DD MMM YYYY")}
                        </p>

                        {data.tags.map((tag) => (
                          <CheckableTag
                            key={tag}
                            checked={tagState.selectedTags.indexOf(tag) > -1}
                            onChange={(checked) => {
                              handleTagChange(tag, checked);
                            }}
                            style={{
                              userSelect: "none",
                              margin: "0px",
                              padding: "0px 3px",
                              border: "none",
                              fontSize: "1em",
                              color:
                                tagState.selectedTags.indexOf(tag) > -1
                                  ? "#fff"
                                  : "#40a9ff",
                            }}
                          >
                            {`#${tag}`}
                          </CheckableTag>
                        ))}
                      </Card>
                    </li>
                  );
                })
              ) : (
                <CardSkeleton count={16} />
              )}
            </ul>
          </Content>
        </Layout>
      </Col>
    </Row>
  );
}
//<Tag key={tag}>{tag}</Tag>
