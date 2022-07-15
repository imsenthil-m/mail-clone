import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Tooltip, Modal, Select } from "antd";
import {
  MailOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  StarOutlined,
  StarFilled,
  UploadOutlined,
  CloudUploadOutlined
} from "@ant-design/icons";
import { getMail, updateMessageMetada } from "../actions/mail";
import { selectMail } from "../actions/mails";
const { Option } = Select;

const MailHeader = (props) => {
  const mail = useSelector((state) => state.mail.content) || {};
  const [moveFolder, setMoveFolder] = useState('');
  const activeMailId = useSelector((state) => state.mailbox.activeMailId) || "";
  const folderName = useSelector((state) => state.folders.activeFolder);
  const folderList = useSelector((state) => state.folders.folders);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const openModal = () => {
    setIsModalVisible(true);
  };
  useEffect(() => {
    if (activeMailId !== "") dispatch(getMail(activeMailId, folderName));
  }, [activeMailId]);

  const handleBack = () => {
    dispatch(selectMail(""));
  };
  const hanldeUpdateMetada = (metadata) => {
    dispatch(updateMessageMetada(activeMailId, folderName, metadata));
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const movableFolderList = folderList.filter(folder => {
    return folder !== folderName && folder !== 'Trash' && folder !== 'Sent' && folder !== 'Drafts'
  })

  const sendMoveFolder = () => {
    if(!moveFolder) {alert("please selct folder"); return;}
    hanldeUpdateMetada({moveTo: moveFolder})
    handleModalClose(false);
  }
  return (
    <div>
      {folderName !== "Trash" ? (
        <Menu mode="horizontal">
          <Menu.Item
            key="back"
            onClick={(e) => handleBack()}
            icon={
              <Tooltip title="back">
                <ArrowLeftOutlined />
              </Tooltip>
            }
          ></Menu.Item>
          <Menu.Item
            key="delete"
            icon={
              <Tooltip title="delete">
                <DeleteOutlined />
              </Tooltip>
            }
            onClick={() => hanldeUpdateMetada({ delete: true })}
          ></Menu.Item>
          <Menu.Item
            key="unread"
            onClick={() => hanldeUpdateMetada({ readStatus: false })}
            icon={
              <Tooltip title="Mark as unread">
                <MailOutlined />
              </Tooltip>
            }
          ></Menu.Item>
          <Menu.Item
            key="star"
            icon={
              mail.starred ? (
                <Tooltip title="starred">
                  <StarFilled />{" "}
                </Tooltip>
              ) : (
                <Tooltip title="unstarred">
                  <StarOutlined />
                </Tooltip>
              )
            }
            onClick={() => hanldeUpdateMetada({ starred: !mail.starred })}
          >
            {" "}
          </Menu.Item>
          <Menu.Item
            key="move"
            icon={
              <Tooltip title="Move to folder">
                <UploadOutlined />
              </Tooltip>
            }
            onClick={() => openModal()}
          ></Menu.Item>
          <Menu.Item
            key="archive"
            icon={
              <Tooltip title="Archive">
                <CloudUploadOutlined />{" "}
              </Tooltip>
            }
          ></Menu.Item>
        </Menu>
      ) : (
        <Menu mode="horizontal">
          <Menu.Item
            key="back"
            onClick={(e) => handleBack()}
            icon={
              <Tooltip title="back">
                <ArrowLeftOutlined />
              </Tooltip>
            }
          ></Menu.Item>
          <Menu.Item
            key="delete"
            icon={
              <Tooltip title="delete forever">
                <DeleteOutlined />
              </Tooltip>
            }
            onClick={() => hanldeUpdateMetada({ foreverDelete: true })}
          ></Menu.Item>

          <Menu.Item
            key="move"
            icon={
              <Tooltip title="Move to inbox">
                <UploadOutlined />
              </Tooltip>
            }
            onClick={() => openModal()}
          ></Menu.Item>
        </Menu>
      )}

      <h3>{mail.subject}</h3>
      <br />
      <br />
      {
        isModalVisible && <Modal
        title="Select folder to move"
        visible={isModalVisible}
        onOk={() => sendMoveFolder()}
        onCancel={handleModalClose}
      >
        <Select   placeholder="Enter folder name to create" onChange={value => setMoveFolder(value)}>
          {
            movableFolderList.map(folder => 
              <Option value={folder} key={folder}>{folder}</Option>
            )
          }
          </Select>
      </Modal>
  }
    </div>
  );
};

export default MailHeader;
