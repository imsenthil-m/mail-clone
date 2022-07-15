import constants from "../utils/constants";
import _ from "lodash";
import axios from "axios";
import {getMails} from './mails';
import {batch} from 'react-redux';
export const getMail = (mailId, folderName) => {
  // const folderPath = `./mocks/messages/${mailId}.json`;
  // let mail = require(folderPath);
  // // switch (mailId) {
  // //   case "Inbox":
  // //   case "Trash":
  // //     mail = require(folderPath);
  // //     break;
  // //   default:
  // //     break;
  // // }
  // return {
  //   type: constants.GET_MAIL,
  //   data: mail
  // };
  return (dispatch) =>  {
    return axios.get(`/api/message/${folderName}/${mailId}`).then((res) =>{
      console.log(res.data);
      dispatch({
        type: constants.GET_MAIL,
        data: res.data
      });
    })
}
};

export const selectMail = (mailId) => {
  return {
    type: constants.SELECT_MAIL,
    data: mailId
  };
};

export const updateMessageMetada = (messageId, folderName, metaData, refreshMailBox) => {
  return (dispatch) =>  {
    return axios.put(`/api/message/${folderName}/${messageId}`, {
      ...metaData
    }).then((res) =>{
      console.log(res.data);
      if(metaData.readStatus !== undefined || metaData.delete !== undefined ) {
        dispatch({
          type: constants.SELECT_MAIL,
          data: ""
        });
      } else {
        dispatch(getMail(messageId, folderName));
      }
      if(refreshMailBox) {
        dispatch(getMails(folderName));
      }
      
    })
}
}

export const newMail = (isNewMail, mailDetails={}) => {
  return {
    type: constants.NEW_MAIL,
    data: {
      isNewMailOpen: isNewMail,
      from: mailDetails.from || '',
      subject: mailDetails.subject || '',
      message: mailDetails.message || ''      
    }
  }
}
export const sendMail = (content, toAddress, subject) => {
  return (dispatch) =>  {
    return axios.post(`/api/message/new`, {content:content, toAddress:toAddress, subject:subject}).then((res) =>{
      console.log(res.data);
      batch(() => {
        dispatch({
          type: constants.GET_MAILS,
          data: res.data
        });
        dispatch(newMail(false));
      })
      
    })
}
}