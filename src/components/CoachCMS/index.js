import React, { useEffect, useState, useContext } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Space,
  Select,
  Switch,
  message,
  Row,
  Col,
  Divider,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { SearchContext } from "../../contexts/searchContext";
import { Redirect } from "react-router-dom";
import TimestampSelector from "../CoachCMSTimestampSelector";
import config from "../../config";
import CmsVideoSelector from "../CoachCMSVideoSelector";
import { v4 as uuidv4 } from "uuid";
import CmsTagEditor from "../CoachCMSTagEditor";
import CmsLecturerEditor from "../CoachCMSLectureEditor";
import moment from "moment";
import DrawerToolsMenu from "../CoachCMSDrawerMenu";

//global required field rules object, default false
const ruleSetRequired = [
  {
    required: true,
    message: "Input required",
  },
];

//simple layout configuation objects
const formLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 24,
  },
};

//start of component function
function CoachCMS() {
  const [tags, setTags] = useState([]); //used for tags field
  const { searchText } = useContext(SearchContext);
  const [previousSearch] = useState(searchText);
  const [guestLecturer, setGuestLecturer] = useState(false);
  const [tutorialVideo, setTutorialVideo] = useState(false);
  const [timestampsVisible, setTimestampsVisible] = useState(false);
  const [timestampVideoUrl, setTimestampVideoUrl] = useState(false);
  const [timestampData, setTimestampData] = useState("");
  const [form] = Form.useForm();

  const [tagEditorVisible, setTagEditorVisible] = useState(false);
  const [tagData, setTagData] = useState(false);
  const [lastTagId, setLastTagId] = useState(null);

  const [lecturerEditorVisible, setLecturerEditorVisible] = useState(false);
  const [lecturerData, setLecturerData] = useState(false);
  const [lastLecturerId, setLastLecturerId] = useState(null);
  const [modeSelector, setModeSelector] = useState(true);
  const [pageOutput, setPageOutput] = useState(false);
  const [editTimestampData, setEditTimestampData] = useState(null);

  //tag data and last tag ID from db
  useEffect(() => {
    const getTagData = async () => {
      const resTagData = await fetch(config.BACKEND_URL_TAGS_GET_ALL_DATA);
      const data = await resTagData.json();

      setTagData(data.sort((a, b) => a.tag - b.tag));

      const resLastKey = await fetch(config.BACKEND_URL_TAGS_LASTKEY);
      const keydata = await resLastKey.json();

      setLastTagId(Number(keydata[0].last_value));
    };
    getTagData();
  }, [tagEditorVisible]);

  //lecturer data and last tag ID from db
  useEffect(() => {
    const getLecturerData = async () => {
      const resLecturerData = await fetch(
        config.BACKEND_URL_LECTURERS_GET_ALL_DATA
      );
      const data = await resLecturerData.json();
      setLecturerData(data.sort((a, b) => a.lecturer - b.lecturer));

      const resLastKey = await fetch(config.BACKEND_URL_LECTURERS_LASTKEY);
      const keydata = await resLastKey.json();

      setLastLecturerId(Number(keydata[0].last_value));

      if (data.length > 0) {
        let tempTagData = data.sort((a, b) => a.key - b.key);
        setLastLecturerId(tempTagData[tempTagData.length - 1].key);
      }
    };
    getLecturerData();
  }, [lecturerEditorVisible]);

  useEffect(() => {
    const additionalTags = tags.filter(
      (tag) => tag !== "lecture" && tag !== "guest lecture"
    );

    if (additionalTags.length > 0 && !guestLecturer) {
      setTags([...additionalTags, "lecture"]);
    } else if (additionalTags.length > 0 && guestLecturer) {
      setTags([...additionalTags, "guest lecture"]);
    } else if (additionalTags.length === 0 && !guestLecturer) {
      setTags(["lecture"]);
    } else if (additionalTags.length === 0 && guestLecturer) {
      setTags(["guest lecture"]);
    }
  }, [guestLecturer]);

  useEffect(() => {
    const additionalTags = tags.filter((tag) => tag !== "tutorial");

    if (additionalTags.length > 0 && !tutorialVideo) {
      setTags([...additionalTags]);
    } else if (additionalTags.length > 0 && tutorialVideo) {
      setTags([...additionalTags, "tutorial"]);
    }
  }, [tutorialVideo]);

  if (searchText !== previousSearch) {
    return <Redirect exact to="/" />;
  }

  const { Option } = Select;
  //set form data from api video selector
  const setFormVideoData = (selectData) => {
    form.resetFields();
    setTags(["lecture"]);
    setEditTimestampData([]);
    setTimestampVideoUrl(selectData.url);
    setEditTimestampData(selectData.timestamps);
    setTimestampData(selectData.timestamps);
    //TODO guest lecturer switch
    //TODO tutorial switch
    if (modeSelector) {
      form.setFieldsValue({
        title: selectData.title,
        video_url: selectData.url,
        thumbnail_url: selectData.thumbnail,
      });
    } else {
      form.setFieldsValue({
        id: selectData.id,
        title: selectData.title,
        lecturer: selectData.lecturer,
        video_url: selectData.url,
        thumbnail_url: selectData.thumbnail,
        lecture_date: selectData.lecture_date,
        bootcamp_week: selectData.bootcamp_week,
        cohort: selectData.cohort,
        description: selectData.description,
      });

      //add tags
      setTags(selectData.tags);

      //add github links
      if (selectData.github_links !== undefined) {
        form.setFieldsValue({
          github_links: selectData.github_links,
        });
      }

      //add slide links
      if (selectData.slides !== undefined) {
        form.setFieldsValue({
          slides: selectData.slides,
        });
      }

      //add other links
      if (selectData.other_links !== undefined) {
        form.setFieldsValue({
          other_links: selectData.other_links,
        });
      }
    }
    message.success("Video selected. Added to form data.", 1);
  };

  //link formatter for form submission object
  const setLinkType = (object, resource) =>
    object ? object.map((obj) => Object.assign(obj, { type: resource })) : [];

  //submit form function
  const submitForm = (values) => {
    const lectureData = {
      ...values,
      tags: tags,
      date: String(values.lecture_date._d).split(" ").slice(0, 4).join(" "),
      timestamps: timestampData,
      github_links: setLinkType(values.github_links, "github"),
      slides: setLinkType(values.slides, "presentation slide"),
      other_links: setLinkType(values.other_links, "additional reading"),
    };

    if (modeSelector) {
      addLecture(lectureData);
    } else {
      const originVideo = pageOutput.filter(
        (origin) => origin.id === values.id
      );
      updateLecture(lectureData);
    }
  };

  const submitFailed = (value) => {
    value.errorFields.map((value) =>
      message.error(
        `${
          value.name[0].slice(0, 1).toUpperCase() + value.name[0].slice(1)
        } field ${value.errors[0].toLowerCase()} `,
        2.5
      )
    );
  };

  //form reset button function
  const onReset = () => {
    form.resetFields();
    setTags(["lecture"]);
    setEditTimestampData([
      {
        timeMoment: "2021-01-14T00:00:00.000Z",
        timeSecondsValue: 0,
        timeString: "00:00:00",
        uuid: uuidv4(),
        timeDesc: "start",
      },
    ]);
  };

  //POST
  async function addLecture(resource) {
    await fetch(config.BACKEND_URL_ADD_CONTENT, {
      method: "POST",
      body: JSON.stringify(resource),
      headers: { "Content-Type": "application/json" },
    });
    await message.success("Form data submitted successfully", 1.5, onReset());
    setPageOutput(
      pageOutput.filter((item) => item.link !== resource.video_url)
    );
  }

  //DELETE
  async function deleteLecture(value) {
    await fetch(config.BACKEND_URL_DELETE_CONTENT + `${value}`, {
      method: "DELETE",
    });
    setPageOutput(pageOutput.filter((item) => item.id !== value));
    message.success("Lecture deleted", 1.5, onReset());
  }

  //PUT
  async function updateLecture(value) {
    await fetch(config.BACKEND_URL_UPDATE_CONTENT, {
      method: "PUT",
      body: JSON.stringify(value),
      headers: { "Content-Type": "application/json" },
    });
    setPageOutput([
      ...pageOutput.filter((item) => item.id !== value.id),
      value,
    ]);
    message.success("Lecture updated", 1.5, onReset());
  }

  //show modal
  const modalDisplay = () => {
    const videoUrlInputValue = form.getFieldValue("video_url");
    setTimestampVideoUrl(videoUrlInputValue);
    setTimestampsVisible(!timestampsVisible);
  };

  const modalHide = () => {
    setTimestampsVisible(false);
  };

  const getTimeStampData = (obj) => {
    setTimestampData(obj.timestamps);
  };

  const toggleTagDisplay = () => {
    setTagEditorVisible(!tagEditorVisible);
  };

  const toggleLecturerDisplay = () => {
    setLecturerEditorVisible(!lecturerEditorVisible);
  };

  const updateTagData = (value) => {
    setTagData(value);
  };

  const updateLastTagData = (value) => {
    setLastTagId(value);
  };

  const updateLecturerData = (value) => {
    setLecturerData(value);
  };

  const updateLastLecturerId = (value) => {
    setLastLecturerId(value);
  };

  const switchVideoMode = () => {
    setModeSelector(!modeSelector);
  };

  const updateVideoSelectPageOutput = (value) => {
    setPageOutput(value);
  };

  //start of rendering
  return (
    <>
      <TimestampSelector
        timestampsVisible={timestampsVisible}
        modalDisplay={modalDisplay}
        timestampVideoUrl={timestampVideoUrl}
        ruleSetRequired={ruleSetRequired}
        submitFailed={submitFailed}
        modalHide={modalHide}
        getTimeStampData={getTimeStampData}
        modeSelector={modeSelector}
        editTimestampData={editTimestampData}
      />

      <CmsTagEditor
        tagData={tagData}
        updateTagData={updateTagData}
        tagEditorVisible={tagEditorVisible}
        toggleTagDisplay={toggleTagDisplay}
        lastTagId={lastTagId}
        updateLastTagData={updateLastTagData}
      />

      <CmsLecturerEditor
        lecturerData={lecturerData}
        updateLecturerData={updateLecturerData}
        lecturerEditorVisible={lecturerEditorVisible}
        toggleLecturerDisplay={toggleLecturerDisplay}
        lastLecturerId={lastLecturerId}
        updateLastLecturerId={updateLastLecturerId}
      />

      <Row justify="end">
        <Space style={{ marginRight: "32px" }}>
          <h1>Lecture Management</h1>
        </Space>
      </Row>

      <Row style={{ marginBottom: "32px" }} justify="center">
        <Col span={22}>
          <DrawerToolsMenu
            toggleTagDisplay={toggleTagDisplay}
            toggleLecturerDisplay={toggleLecturerDisplay}
            updateVideoSelectPageOutput={updateVideoSelectPageOutput}
            switchVideoMode={switchVideoMode}
            modeSelector={modeSelector}
          />
          <Divider style={{ marginBottom: "0", marginTop: "42px" }} />
        </Col>
      </Row>

      <Row justify={"center"}>
        <Col span={14}>
          <CmsVideoSelector
            modeSelector={modeSelector}
            setFormVideoData={setFormVideoData}
            pageOutput={pageOutput}
            updateVideoSelectPageOutput={updateVideoSelectPageOutput}
            deleteLecture={deleteLecture}
          />
        </Col>

        <Col span={8}>
          <h3 style={{ marginBottom: "1em" }}>Form Data</h3>
          <Form
            style={{ padding: "1em" }}
            {...formLayout}
            name="cms"
            form={form}
            initialValues={{
              remember: false,
            }}
            onFinish={submitForm}
            onFinishFailed={(value) => submitFailed(value)}
          >
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>

            <Form.Item label="Video Title" name="title" rules={ruleSetRequired}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Guest Lecturer"
              // name="guest_lecture_switch"
              valuePropName="checked"
            >
              <Switch
                onChange={() => {
                  setGuestLecturer(!guestLecturer);
                }}
              />
            </Form.Item>

            <Form.Item
              label={!guestLecturer ? "Lecturer Name" : "Guest Lecturer Name"}
              name="lecturer"
              rules={ruleSetRequired}
            >
              {!guestLecturer ? (
                <Select>
                  {lecturerData ? (
                    lecturerData.map((value) => (
                      <Option key={value.lecturer}>{value.lecturer}</Option>
                    ))
                  ) : (
                    <Option key={"no data"}>{"no data"}</Option>
                  )}
                </Select>
              ) : (
                <Input />
              )}
            </Form.Item>

            <Form.Item
              label="Video URL"
              name="video_url"
              rules={ruleSetRequired}
            >
              <Input onChange={(e) => setTimestampVideoUrl(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Thumbnail URL"
              name="thumbnail_url"
              rules={ruleSetRequired}
            >
              <Input />
            </Form.Item>

            <Form.Item
              // name="tutorial_switch"
              label="Tutorial"
              valuePropName="checked"
            >
              <Switch
                onChange={() => {
                  setTutorialVideo(!tutorialVideo);
                }}
              />
            </Form.Item>

            <Form.Item label="Tags" rules={ruleSetRequired}>
              <Select
                mode="multiple"
                name="tags"
                value={tags}
                placeholder="Select tags"
                onChange={(value) => {
                  setTags(value);
                }}
              >
                {tagData ? (
                  tagData.map((value) => (
                    <Option key={value.tag}>{value.tag}</Option>
                  ))
                ) : (
                  <Option key={"no data"}>{"no data"}</Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              label={!guestLecturer ? "Lecture Date" : "Guest Speaker Date"}
              name="lecture_date"
              rules={ruleSetRequired}
            >
              <DatePicker defaultPickerValue={moment()} />
            </Form.Item>

            <Form.Item
              label="Bootcamp Week"
              name="bootcamp_week"
              rules={ruleSetRequired}
            >
              <InputNumber min={1} />
            </Form.Item>

            <Form.Item label="Cohort" name="cohort" rules={ruleSetRequired}>
              <InputNumber min={1} />
            </Form.Item>

            <Form.Item
              label="Video Description"
              name="description"
              rules={ruleSetRequired}
            >
              <Input.TextArea autoSize={{ minRows: 8 }} />
            </Form.Item>

            <Form.Item label={"Timestamps"}>
              <Button
                onClick={() =>
                  timestampVideoUrl &&
                  timestampVideoUrl.slice(0, 18) === "https://vimeo.com/" &&
                  typeof Number(timestampVideoUrl.slice(0, 18)) === "number"
                    ? modalDisplay()
                    : message.warn(
                        "Please select a video or update the video url field"
                      )
                }
              >
                Open Timestamp Editor
              </Button>
            </Form.Item>

            <Form.Item label="Github Links">
              <Form.List name="github_links">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <Space
                        key={field.key}
                        style={{ display: "flex", marginBottom: 0 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...field}
                          name={[field.name, "link"]}
                          fieldKey={[field.fieldKey, "link"]}
                        >
                          <Input placeholder="url" />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          name={[field.name, "desc"]}
                          fieldKey={[field.fieldKey, "desc"]}
                        >
                          <Input placeholder="description" />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          name={[field.name, "uuid"]}
                          fieldKey={[field.fieldKey, "uuid"]}
                          hidden
                          initialValue={uuidv4()}
                        ></Form.Item>

                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Add Github Link
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>

            <Form.Item label="Slide Links">
              <Form.List name="slides">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <Space
                        key={field.key}
                        style={{ display: "flex", marginBottom: 0 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...field}
                          name={[field.name, "link"]}
                          fieldKey={[field.fieldKey, "link"]}
                        >
                          <Input placeholder="url" />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          name={[field.name, "desc"]}
                          fieldKey={[field.fieldKey, "desc"]}
                        >
                          <Input placeholder="description" />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          name={[field.name, "uuid"]}
                          fieldKey={[field.fieldKey, "uuid"]}
                          hidden
                          initialValue={uuidv4()}
                        ></Form.Item>

                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Add Slide Link
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>

            <Form.Item label="Other Links">
              <Form.List name="other_links">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <Space
                        key={field.key}
                        style={{ display: "flex", marginBottom: 0 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...field}
                          name={[field.name, "link"]}
                          fieldKey={[field.fieldKey, "link"]}
                        >
                          <Input placeholder="url" />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          name={[field.name, "desc"]}
                          fieldKey={[field.fieldKey, "desc"]}
                        >
                          <Input placeholder="description" />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          name={[field.name, "uuid"]}
                          fieldKey={[field.fieldKey, "uuid"]}
                          hidden
                          initialValue={uuidv4()}
                        ></Form.Item>

                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Add Other Link
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                {modeSelector ? "Submit New Lecture" : "Submit Changes"}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default CoachCMS;
