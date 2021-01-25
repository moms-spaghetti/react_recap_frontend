import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../../firebase/Base";
import { AuthContext } from "../../firebase/Auth";
import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import background from "../../images/waveBackground.svg";
import logo from "../../images/soc-logo.png";

const Login = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  const handleLogin = useCallback(
    async (values) => {
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(values.email, values.password);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Row
      justify="end"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        backgroundPositionX: "center",
        backgroundPositionY: "center",
      }}
    >
      <Col
        span={24}
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      >
        <Form
          onFinish={handleLogin}
          style={{
            border: "1px solid #ddd",
            width: "30vw",
            minWidth: "350px",
            maxWidth: "500px",
            backgroundColor: "rgba(253,253,253,0.7)",

            padding: "2rem",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Email address required",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              style={{ borderRadius: "5px" }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Password required",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              style={{ borderRadius: "5px" }}
            />
          </Form.Item>
          <Form.Item
            style={{
              margin: "0px",
            }}
          >
            <Button type="primary" htmlType="submit" block>
              Log In
            </Button>
          </Form.Item>
        </Form>
        <h1
          style={{
            position: "fixed",
            bottom: "0px",
            right: "0px",
            margin: "1em",
            fontSize: "3rem",
            userSelect: "none",
            color: "#aaa",
          }}
        >
          re:cap
          <img
            src={logo}
            alt="school of code logo"
            style={{ width: "100px", marginLeft: "1rem" }}
          />
        </h1>
      </Col>
    </Row>
  );
};

export default withRouter(Login);
