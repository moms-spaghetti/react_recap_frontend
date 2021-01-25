import React, { useRef, useState, useCallback, useEffect } from "react";
import { Modal, Button, Input, Form, Space, TimePicker, message } from "antd";
import ReactPlayer from "react-player";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const TimestampSelector = ({
  timestampsVisible,
  modalDisplay,
  timestampVideoUrl,
  ruleSetRequired,
  submitFailed,
  getTimeStampData,
  modalHide,
  modeSelector,
  editTimestampData,
}) => {
  const player = useRef(null);
  const [form] = Form.useForm();
  const [seekTimeMoment, setSeekTimeMoment] = useState(
    moment("00:00:00", "HH:mm:ss")
  );
  const [seekTimeSeconds, setSeekTimeSeconds] = useState(0);
  const [seekTimeString, setSeekTimeString] = useState("00:00:00");
  const [playerBuffering, setPlayerBuffering] = useState(false);

  useEffect(() => {
    if (editTimestampData) {
      form.setFieldsValue({
        timestamps: editTimestampData.map((value) => ({
          ...value,
          timeMoment: moment(value.timeMoment),
        })),
      });
    }
  }, [form, editTimestampData, modeSelector]);

  const submitForm = useCallback(
    (timestamps) => {
      getTimeStampData(timestamps);
      message.success("Timestamps saved", 1.5, modalHide());
    },
    [getTimeStampData, modalHide]
  );

  return (
    <Modal
      title="Timestamp Selector"
      visible={timestampsVisible}
      onOk={form.submit}
      onCancel={() => {
        modalDisplay();
      }}
      width="fit-content"
      destroyOnClose={true}
      okText={"Finish"}
    >
      <>
        {timestampVideoUrl ? (
          <ReactPlayer
            ref={player}
            url={timestampVideoUrl}
            controls={true}
            style={{ marginBottom: "20px" }}
            onBuffer={() => setPlayerBuffering(true)}
            onBufferEnd={() => setPlayerBuffering(false)}
          />
        ) : (
          <p>select a video file or add url</p>
        )}
      </>
      <Form
        name="cms_timestamps"
        form={form}
        initialValues={{
          remember: false,
        }}
        onFinish={submitForm}
        onFinishFailed={(value) => {
          submitFailed(value);
        }}
      >
        <Form.Item label="Timestamps" required>
          <Form.List name="timestamps" rules={ruleSetRequired}>
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
                      name={[field.name, "timeMoment"]}
                      fieldKey={[field.fieldKey, "timeMoment"]}
                      style={{ width: "140px" }}
                      rules={ruleSetRequired}
                      initialValue={seekTimeMoment}
                    >
                      <TimePicker />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, "timeDesc"]}
                      label="Description"
                      style={{ width: "350px" }}
                      fieldKey={[field.fieldKey, "timeDesc"]}
                      rules={ruleSetRequired}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, "timeSecondsValue"]}
                      fieldKey={[field.fieldKey, "timeSecondsValue"]}
                      initialValue={seekTimeSeconds}
                      hidden
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, "timeString"]}
                      fieldKey={[field.fieldKey, "timeString"]}
                      initialValue={seekTimeString}
                      hidden
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, "uuid"]}
                      fieldKey={[field.fieldKey, "uuid"]}
                      hidden
                      initialValue={uuidv4()}
                    >
                      <Input />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    disabled={playerBuffering}
                    type="dashed"
                    onClick={() => {
                      const timeString = new Date(
                        Math.floor(player.current.getCurrentTime()) * 1000
                      )
                        .toISOString()
                        .substr(11, 8);
                      setSeekTimeMoment(moment(timeString, "HH:mm:ss"));
                      setSeekTimeSeconds(
                        Math.floor(player.current.getCurrentTime())
                      );
                      setSeekTimeString(timeString);
                      add();
                    }}
                    icon={<PlusOutlined />}
                  >
                    {playerBuffering ? "Loading Timestamp" : "Add Timestamp"}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TimestampSelector;
