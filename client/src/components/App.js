import React from "react";
import Folders from "./Folder";
import { Col, Row } from "antd";
import Mailbox from "./Mailbox";
import "antd/dist/antd.css";
import '../styles.css';
import Header from './Header';
const App = () => {
  return (
    <div>
      <Header/>
    <Row gutter={1}>
      <Col span={4}>
        <Folders />
      </Col>
      <Col span={18}>
        <Mailbox />
      </Col>
    </Row>
    </div>
  );
};

export default App;
