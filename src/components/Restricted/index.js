import React from "react";
import { Row, Col, Layout } from "antd";

const { Content } = Layout;

const Restricted = () => {
  return (
    <Row justify="center" style={{ height: "80vh" }}>
      <Col span={23}>
        <Content>
          <h1>Access to this page restricted</h1>
        </Content>
      </Col>
    </Row>
  );
};

export default Restricted;
