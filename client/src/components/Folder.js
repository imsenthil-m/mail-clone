import React, { useRef, useState } from "react";
import { Divider, Input, Modal } from "antd";

import { useDispatch, useSelector } from "react-redux";
import FolderList from "./FolderList";
import { FolderAddOutlined } from "@ant-design/icons";
import {addFolder} from '../actions/folders';
import { trim } from "lodash";

const Folders = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [folderNameKey, setFolderNameKey] = useState(0);
  const folderNameRef = useRef(null);
  const openModal = () => {
    setIsModalVisible(true);
  };
  const dispatch = useDispatch();
  const createFolder = () => {
    let newFolderName = folderNameRef.current.input.value;
    if(!newFolderName || !trim(newFolderName)) return; 
    dispatch(addFolder(newFolderName));

    setFolderNameKey(folderNameKey+1);
    setIsModalVisible(false);
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="folder-list">
      <FolderList />
      <Divider dashed={true} />
      <span onClick={openModal}>
        <FolderAddOutlined style={{ fontSize: "16px", color: "#08c" }} /> Create
        New{" "}
      </span>
      <Modal
        title="Create New Folder"
        visible={isModalVisible}
        onOk={createFolder}
        onCancel={handleModalClose}
      >
        <Input ref={folderNameRef} key = {folderNameKey} placeholder="Enter folder name to create" />
      </Modal>
    </div>
  );
};
export default Folders;
