import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Table,
  Form,
  Input,
  message,
  Space,
  Popconfirm,
} from "antd";
import config from "../../config";
import {
  CloseCircleOutlined,
  EditOutlined,
  SaveOutlined,
  StopOutlined,
} from "@ant-design/icons";

const CmsLecturerEditor = ({
  lecturerEditorVisible,
  toggleLecturerDisplay,
  lecturerData,
  updateLecturerData,
  lastLecturerId,
  updateLastLecturerId,
}) => {
  const [lecturerDelete, setLecturerDelete] = useState(null);
  const [lecturerAdd, setLecturerAdd] = useState(null);
  const [form] = Form.useForm();
  const [inputDisabled, setInputDisabled] = useState(true);
  const [lecturerInput, setLecturerInput] = useState(null);
  const [lecturerUpdate, setLecturerUpdate] = useState(null);

  useEffect(() => {
    const deleteLecturer = async () => {
      await fetch(
        config.BACKEND_URL_LECTURERS_DELETE + `${lecturerDelete.key}`,
        {
          method: "DELETE",
        }
      );
      updateLecturerData(
        lecturerData.filter((lecturer) => lecturer.key !== lecturerDelete.key)
      );
      message.success(`'${lecturerDelete.lecturer}' has been deleted`);
      setLecturerDelete(null);
    };
    if (lecturerDelete) {
      deleteLecturer();
    }
  }, [lecturerDelete]);

  useEffect(() => {
    const addLecturer = async () => {
      await fetch(config.BACKEND_URL_LECTURERS_ADD, {
        method: "POST",
        body: JSON.stringify({ lecturer: lecturerAdd }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      updateLecturerData([
        ...lecturerData,
        { key: lastLecturerId, lecturer: lecturerAdd },
      ]);
      message.success(`'${lecturerAdd}' has been added`);
      setLecturerAdd(null);
    };
    if (lecturerAdd) {
      addLecturer();
    }
  }, [lecturerAdd]);

  useEffect(() => {
    const updateLecturer = async () => {
      await fetch(config.BACKEND_URL_LECTURERS_UPDATE, {
        method: "PATCH",
        body: JSON.stringify(lecturerUpdate),
        headers: {
          "Content-Type": "application/json",
        },
      });
    };
    if (lecturerUpdate) {
      updateLecturer();
      message.success(`Lecturer updated`);
      setLecturerUpdate(null);
    }
  }, [lecturerUpdate]);

  const { Column } = Table;

  const submitLecturer = (submittedLecturer) => {
    let lecturerCheck = null;

    if (lecturerData) {
      lecturerCheck = lecturerData.some(
        (value) =>
          value.lecturer.toLowerCase() === submittedLecturer.name.toLowerCase()
      );
      if (lecturerCheck) {
        message.error(`Lecturer already exists`);
        form.resetFields();
      } else {
        updateLastLecturerId(lastLecturerId + 1);
        setLecturerAdd(submittedLecturer.name);
        form.resetFields();
      }
    } else {
      updateLastLecturerId(lastLecturerId + 1);
      setLecturerAdd(submittedLecturer.name);
      form.resetFields();
    }
  };

  return (
    <Modal
      visible={lecturerEditorVisible}
      onCancel={() => {
        toggleLecturerDisplay();
        setInputDisabled(!inputDisabled);
      }}
      footer={null}
      closable
      destroyOnClose
    >
      <h3>Lecturer Editor</h3>
      <Form name="lecturerform" onFinish={submitLecturer} form={form}>
        <Space>
          <Form.Item
            label="Lecturer Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Space>
              <Input
                placeholder="Enter lecturer name"
                style={{ width: "200px" }}
                disabled={inputDisabled}
              />
              <Button type="primary" htmlType="submit" disabled={inputDisabled}>
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Space>
      </Form>

      <Table
        dataSource={lecturerData}
        size="small"
        pagination={{ pageSize: 50 }}
        scroll={{ y: 500 }}
      >
        <Column title="ID" dataIndex="key" key="key" />
        <Column
          title="Lecturer"
          key="lecturer"
          render={(record) => (
            <Input
              defaultValue={record.lecturer}
              bordered={false}
              disabled={inputDisabled}
              onChange={(e) =>
                setLecturerInput({
                  updateRecord: record.key,
                  updateValue: e.target.value,
                })
              }
            />
          )}
        />

        <Column
          title="Delete"
          key="delete"
          render={(record) => (
            <Popconfirm
              title={`Are you sure you want to delete '${record.lecturer}'`}
              okText={`delete`}
              cancelText={`cancel`}
              onConfirm={() => setLecturerDelete(record)}
              disabled={inputDisabled}
            >
              {inputDisabled ? (
                <StopOutlined style={{ color: "#ccc" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </Popconfirm>
          )}
        />
      </Table>
      {inputDisabled ? (
        <p style={{ color: "green" }}>Viewing Mode</p>
      ) : (
        <p style={{ color: "red" }}>Editing Mode</p>
      )}
      <Space>
        <Button
          onClick={() => {
            setInputDisabled(!inputDisabled);
          }}
        >
          Edit <EditOutlined />
        </Button>
        <Button
          onClick={() => {
            setLecturerUpdate(lecturerInput);
            setLecturerInput(null);
          }}
          disabled={
            (inputDisabled && !lecturerInput) || !lecturerInput ? true : false
          }
        >
          Save <SaveOutlined />
        </Button>
      </Space>
    </Modal>
  );
};

export default CmsLecturerEditor;
