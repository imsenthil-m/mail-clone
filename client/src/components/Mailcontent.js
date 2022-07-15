import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Row, Col, Button, Tooltip } from "antd";
import {
  MailOutlined,
  RollbackOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  StarOutlined,
  StarFilled,
  UploadOutlined,
  CloudUploadOutlined
} from "@ant-design/icons";
import { getMail, sendMail, updateMessageMetada } from "../actions/mail";
import { selectMail } from "../actions/mails";

import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import TextFromatter from "./TextFormatter";
import MailHeader from "./MailHeader";
import moment from 'moment';

const Mailcontent = (props) => {
  const mail = useSelector((state) => state.mail.content) || {};
  const [replyMail, setReplyMail] = useState(false);
  const [editorState, setEditorState] = useState();
  const editorRef = useRef(null);
  const activeMailId = useSelector((state) => state.mailbox.activeMailId) || "";
  const folderName = useSelector((state) => state.folders.activeFolder);
  const dispatch = useDispatch();
  useEffect(() => {
    if (activeMailId !== "") dispatch(getMail(activeMailId, folderName));
  }, [activeMailId]);

  const handleBack = () => {
    dispatch(selectMail(""));
  };
  const hanldeUpdateMetada = metadata => {
    dispatch(updateMessageMetada(activeMailId, folderName,metadata))
  }
  const mailArrivedAt = new Date(mail.date).getTime();
  const sendReplyMail = () => {
        const subject = `RE:${mail.subject}`;
        const message = `${editorRef.current.value}\n\n\n\n\n\n-------Original message from Sender----\n\n${mail.body}`;
        const toReceipent = mail.from;
        dispatch(sendMail(message, toReceipent, subject));
  }
  return (
    <div style={{marginLeft: "20px"}}>
      <MailHeader />
      <Row>
        <Col span={1}>
          <Avatar size={32} icon={<UserOutlined />} />
        </Col>
        <Col span={23}>
          <Row>
            <Col span={8}>
              <div className="from-mail-address">{mail.from}</div>
              <div className="to-mail-address">
                <sub>{mail.to}</sub>
              </div>
            </Col>
            <Col span={6} offset={8}>
              <span><Tooltip title="From date">{moment(mailArrivedAt).fromNow()}</Tooltip></span>
              <span style={{ marginLeft: "20px" }}>
                <Tooltip title="Reply"><RollbackOutlined onClick={() => setReplyMail(true)}/></Tooltip>{" "}
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
      <br />
      <br />
      {
       replyMail && <><Row>
         <Col span={3}>
           Reply Message
         </Col>
          <Col span={21}>
                    <textarea
                        style={{width: "100%", height: "400px"}}
                        ref={editorRef}
                        onChange = {(e) => {
                            setEditorState(editorState)}
                        }
                    />
                </Col>
        </Row>
        <Row justify={'end'}>
          <Col >
                <Button type="primary" onClick={() => sendReplyMail()}>Send</Button>
                
                <Button style={{marginLeft:"10px"}} onClick={(() => setReplyMail(false))}>Cancel</Button>
          </Col>
        </Row>
        <br/>
        <br/>
        <br/>
        </>
      }

      <Row>
        <TextFromatter text={mail.body} />
      </Row>
    </div>
  );
};

export default Mailcontent;
