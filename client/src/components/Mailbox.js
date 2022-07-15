import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Mails from "./Mails";
import Mailcontent from "./Mailcontent";
import { selectMail } from "../actions/mails";
import NewMail from './NewMail';
const MailBox = (props) => {
  const activeMailId = useSelector((state) => state.mailbox.activeMailId) || "";
  const folderName = useSelector((state) => state.folders.activeFolder) || "";
  const isNewMailOpen = useSelector((state) => state.mail.isNewMailOpen) || "";
  const dispatch = useDispatch();
  useEffect(() => {
    if (folderName) dispatch(selectMail(""));
  }, [folderName]);
  if(isNewMailOpen) return <NewMail />
  return activeMailId !== "" ? <Mailcontent /> : <Mails key={folderName}/>;
};

export default MailBox;
