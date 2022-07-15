import React, { useEffect } from "react";
import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getFolders, selectFolder } from "../actions/folders";
import {batch} from 'react-redux';
import { newMail } from "../actions/mail";
// const folders = [
//   "Inbox",
//   "Trash",
//   "Work Emails",
//   "Mailing Lists",
//   "Sent",
//   "Spam",
//   "Drafts",
//   "Personal"
// ];

const FolderList = (props) => {
  const folders = useSelector((state) => state.folders.folders) || [];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFolders());
  }, []);

  useEffect(() => {
    if (folders && folders.length) dispatch(selectFolder(folders[0]));
  }, [folders]);

  const handleFolderSelect = (folderName) => {
    batch(() => {
      dispatch(selectFolder(folderName));
      dispatch(newMail(false));
    })
    
  };
  return (
    <Menu
      defaultSelectedKeys={["Inbox"]}
      mode="inline"
      onClick={(e) => handleFolderSelect(e.key)}
    >
      {folders.map((folder) => {
        return (
          <Menu.Item key={folder}>
            {" "}
            <span>
              <span>{folder}</span>
            </span>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};
export default FolderList;
