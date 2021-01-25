import React, { useState, useEffect } from "react";
import {
  Pagination,
  Spin,
  Card,
  Modal,
  Popover,
  Tooltip,
  Skeleton,
  Popconfirm,
  Layout,
} from "antd";
import config from "../../config";
import {
  PlusCircleOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import moment from "moment";
import ReactPlayer from "react-player";
import DescriptionBox from "../CoachCMSDescription";
import { v4 as uuidv4 } from "uuid";
import CardSkeleton from "../Skeletons/Card";

const { Content } = Layout;

const CmsVideoSelector = ({
  setFormVideoData,
  modeSelector,
  pageOutput,
  updateVideoSelectPageOutput,
  deleteLecture,
}) => {
  const [total, setTotal] = useState(0);
  const [paging, setPaging] = useState({ position: 1, paging: 30 });
  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerData, setViewerData] = useState();

  useEffect(() => {
    async function getVimeoVideoData() {
      const vimRes = await fetch(
        config.BACKEND_URL_VIMEO_GET_ALL_DATA +
          `?pagePosition=${paging.position}&perPageCount=${paging.paging}`
      );
      const vimData = await vimRes.json();

      const recapRes = await fetch(config.BACKEND_URL_SEARCH);
      const recapData = await recapRes.json();

      const vimPageData = [];

      vimData.data.forEach((vim) => {
        if (!recapData.some((rec) => rec.video_url === vim.link)) {
          vimPageData.push(vim);
        }
      });

      setTotal(vimData.total);
      updateVideoSelectPageOutput(vimPageData);
    }
    if (modeSelector) {
      getVimeoVideoData();
    }
  }, [modeSelector, paging]);

  useEffect(() => {
    const getRecapVideoData = async () => {
      const response = await fetch(config.BACKEND_URL_SEARCH);
      const data = await response.json();

      updateVideoSelectPageOutput(data);
      setTotal(data.length);
    };
    if (!modeSelector) {
      getRecapVideoData();
    }
  }, [modeSelector, paging]);

  const viewerDisplay = () => {
    setViewerVisible(!viewerVisible);
  };

  // if (!pageOutput || pageOutput === undefined) {
  //   return <CardSkeleton count={16} minWidth={"120px"} maxWidth={"480px"} />;
  // } else
  return (
    <>
      <Modal
        title="Video Viewer"
        visible={viewerVisible}
        width="fit-content"
        onCancel={viewerDisplay}
        footer={null}
        destroyOnClose
      >
        {!!viewerData && (
          <>
            <ReactPlayer
              url={modeSelector ? viewerData.link : viewerData.video_url}
              controls={true}
              style={{ marginBottom: "16px" }}
              playing
            />

            <DescriptionBox
              width={640}
              data={viewerData}
              modeSelector={modeSelector}
            />
          </>
        )}
      </Modal>

      {modeSelector ? (
        <h3>Vimeo API Video Selector</h3>
      ) : (
        <h3>re:cap Video Editor</h3>
      )}

      <Pagination
        onChange={(page, pageSize) => {
          setPaging({ position: page, paging: pageSize });
        }}
        total={total}
        current={paging.position}
        pageSize={paging.paging}
        defaultCurrent={1}
        defaultPageSize={30}
        responsive={true}
        pageSizeOptions={[30, 40, 50]}
        style={{ marginBottom: "16px" }}
      />

      <Content style={{ backgroundColor: "#fff" }}>
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            position: "relative",
            padding: "0",
            listStyle: "none",
          }}
        >
          {pageOutput ? (
            pageOutput.map((vItem) => (
              <li
                style={{
                  padding: "0",
                  listStyle: "none",
                  minWidth: "120px",
                  maxWidth: "480px",
                  marginRight: "1.5em",
                  marginBottom: "1.5em",
                }}
              >
                <Card
                  hoverable
                  cover={
                    <img
                      src={
                        modeSelector
                          ? vItem.pictures.sizes[4].link
                          : vItem.thumbnail_url
                      }
                      alt={modeSelector ? vItem.name : vItem.title}
                      onClick={() => {
                        viewerDisplay();
                        setViewerData(vItem);
                      }}
                    />
                  }
                  key={modeSelector ? vItem.link : vItem.video_url}
                  actions={[
                    <Tooltip title={"Play"}>
                      <PlayCircleOutlined
                        key="play"
                        onClick={() => {
                          viewerDisplay();
                          setViewerData(vItem);
                        }}
                      />
                    </Tooltip>,

                    modeSelector ? (
                      <Popover
                        content={
                          <DescriptionBox
                            width={350}
                            data={vItem}
                            modeSelector={modeSelector}
                          />
                        }
                      >
                        <QuestionCircleOutlined key="info" />
                      </Popover>
                    ) : (
                      <Tooltip title={"Delete"}>
                        <Popconfirm
                          title="Confirm deletion of this lecture"
                          okText="Delete"
                          onConfirm={() => deleteLecture(vItem.id)}
                        >
                          <CloseCircleOutlined />
                        </Popconfirm>
                      </Tooltip>
                    ),
                    <Tooltip title={"Select"}>
                      <PlusCircleOutlined
                        key="select"
                        onClick={() => {
                          if (modeSelector) {
                            setFormVideoData({
                              title: vItem.name,
                              url: vItem.link,
                              thumbnail: vItem.pictures.sizes[4].link,
                              timestamps: [
                                {
                                  timeMoment: "2021-01-14T00:00:00.000Z",
                                  timeSecondsValue: 0,
                                  timeString: "00:00:00",
                                  uuid: uuidv4(),
                                  timeDesc: "start",
                                },
                              ],
                            });
                          } else {
                            setFormVideoData({
                              id: vItem.id,
                              title: vItem.title,
                              lecturer: vItem.lecturer,
                              url: vItem.video_url,
                              thumbnail: vItem.thumbnail_url,
                              tags: vItem.tags,
                              lecture_date: moment(vItem.lecture_date),
                              bootcamp_week: vItem.bootcamp_week,
                              cohort: vItem.cohort,
                              description: vItem.description,
                              timestamps: vItem.timestamps,
                              github_links: vItem.github_links,
                              slides: vItem.slides,
                              other_links: vItem.other_links,
                            });
                          }
                        }}
                      />
                    </Tooltip>,
                  ]}
                >
                  <Meta
                    onClick={() => {
                      viewerDisplay();
                      setViewerData(vItem);
                    }}
                    title={modeSelector ? vItem.name : vItem.title}
                    description={moment(
                      modeSelector ? vItem.created_time : vItem.lecture_date
                    ).format("DD MMM YYYY")}
                  />
                </Card>
              </li>
            ))
          ) : (
            <CardSkeleton count={16} minWidth={"120px"} maxWidth={"480px"} />
          )}
        </ul>
      </Content>
    </>
  );
};

export default CmsVideoSelector;
