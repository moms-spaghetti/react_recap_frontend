import React from "react";
import { Row, Col, Space } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  LinkedinOutlined,
  MediumOutlined,
  EnvironmentOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "./style.css";

const Footer = () => {
  return (
    <Row
      style={{
        display: "block",
        height: "150px",
        width: "100%",
        marginTop: "10%",
      }}
    >
      <Row
        align="bottom"
        justify="center"
        style={{
          backgroundColor: "#e2e2e2",
          width: "100%",
          height: "150px",
          boxShadow: "0px 1px 11px 3px rgba(204,204,204,1)",
          position: "relative",
          bottom: 0,
          left: 0,
        }}
      >
        <p
          style={{
            textAlign: "center",
            margin: "16px 32px",
            color: "#c2c2c2",
            width: "800px",
          }}
        >
          <Col style={{ fontSize: "2em" }}>
            <Space size="large">
              <Space size="small">
                <a
                  href="https://twitter.com/theschoolofcode?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterOutlined
                    className="footer-link"
                    id="footer-link-twitter"
                  />
                </a>
                <a
                  href="https://www.facebook.com/schoolofcode"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookOutlined
                    className="footer-link"
                    id="footer-link-facebook"
                  />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCKBzheEKcrqsaJhMV0f_Dmg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YoutubeOutlined
                    className="footer-link"
                    id="footer-link-youtube"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/school/school-of-code/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinOutlined
                    className="footer-link"
                    id="footer-link-linkedin"
                  />
                </a>
                <a
                  href="https://blog.schoolofcode.co.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MediumOutlined
                    className="footer-link"
                    id="footer-link-medium"
                  />
                </a>
              </Space>
              <Space>
                <a
                  href="https://goo.gl/maps/QJZAACMTBw52"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <EnvironmentOutlined
                    className="footer-link"
                    id="footer-link-env"
                  />
                </a>
                <a
                  href="mailto:info@schoolofcode.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MailOutlined className="footer-link" id="footer-link-mail" />
                </a>
              </Space>
            </Space>
          </Col>
          © Copyright 2021 School of Code. All Rights Reserved - Privacy Policy
          - Terms of Use School of Code Ltd is registered in England, Company
          No. 09793790 School of Code, Custard Factory, Gibb Street, Birmingham,
          B9 4AA
        </p>
      </Row>
    </Row>
  );
};

export default Footer;
