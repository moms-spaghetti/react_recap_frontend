import React, { useEffect, useRef, useState, useContext } from "react";
import { useLocation, Redirect } from "react-router-dom";
import ReactPlayer from "react-player";
import "./style.css";
import { SearchContext } from "../../contexts/searchContext";
import config from "../../config";
import FeedbackForm from "../FeedbackForm";
import {
  GithubOutlined,
  FundProjectionScreenOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../firebase/Auth";
import { Spin, Row, Col, Space, Button, Divider } from "antd";
import FeedbackViewer from "../FeedbackViewer";

const LectureViewer = () => {
  const { isAdmin } = useContext(AuthContext);
  const id = useLocation().pathname.split("/").pop();
  const player = useRef(null);
  const [videoData, setVideoData] = useState(false);
  const { searchText } = useContext(SearchContext);
  const [previousSearch] = useState(searchText);

  useEffect(() => {
    async function getVideoData() {
      const response = await fetch(config.BACKEND_URL_SEARCH_BY_ID + id);
      const data = await response.json();
      setVideoData(data[0]);
    }
    getVideoData();
  }, [id]);

  if (searchText !== previousSearch) {
    return <Redirect exact to="/" />;
  }

  function seekToTimestamp(seconds) {
    return player.current.seekTo(seconds);
  }

  if (!videoData) {
    return (
      <>
        <Spin />
      </>
    );
  } else
    return (
      <Row justify="center" style={{ minHeight: "1000px" }}>
        <Col span={15}>
          <Col className="player-wrapper">
            <ReactPlayer
              ref={player}
              url={videoData.video_url}
              controls={true}
              className="react-player"
              width="95%"
              height="95%"
            />
            <Col
              style={{
                margin: "0px",
                padding: "0px 3px",
                border: "none",
                fontSize: "1em",
                color: "#40a9ff",
              }}
            >
              {videoData.tags.map((tag) => `#${tag} `)}
            </Col>
          </Col>
          <Col span={23}>
            <h1 style={{ padding: "0px", marginBottom: "0px" }}>
              {videoData.title}
            </h1>
            <h2 style={{ padding: "0px", color: "#b2b2b2" }}>
              {videoData.lecturer}
            </h2>
            <Space direction="vertical" style={{ width: "99%" }}>
              <Divider style={{ marginBottom: "0", marginTop: "0" }} />
              <Row style={{ textAlign: "justify" }}>
                {videoData.description}
              </Row>
            </Space>
          </Col>
        </Col>
        <Col span={5}>
          <Divider orientation="left">Resources</Divider>​
          <Space direction="vertical">
            {videoData.github_links !== [] &&
              videoData.github_links.map((value) => (
                <a
                  key={value.uuid}
                  href={value.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Space>
                    <GithubOutlined />
                    {value.desc}
                  </Space>
                </a>
              ))}
            {videoData.slides !== [] &&
              videoData.slides.map((value) => (
                <a
                  key={value.uuid}
                  href={value.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Space>
                    <FundProjectionScreenOutlined /> {value.desc}
                  </Space>
                </a>
              ))}
            {videoData.other_links.map((value) => (
              <a
                key={value.uuid}
                href={value.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Space>
                  <FileTextOutlined />
                  {value.desc}
                </Space>
              </a>
            ))}
          </Space>
          <Divider orientation="left">Timestamps</Divider>
          <Space size="small" direction="vertical" style={{ width: "100%" }}>
            {videoData.timestamps.map((value) => {
              return (
                <Button
                  key={value.uuid}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    overflow: "hidden",
                  }}
                  onClick={() => seekToTimestamp(value.timeSecondsValue)}
                >
                  {`${value.timeString} - ${value.timeDesc}`}
                </Button>
              );
            })}
          </Space>
          <Divider orientation="left">Feedback</Divider>
          {isAdmin ? <FeedbackViewer /> : <FeedbackForm />}
        </Col>
        <Col span={20}></Col>
      </Row>
    );
};

export default LectureViewer;
