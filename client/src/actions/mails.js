import constants from "../utils/constants";
import _ from "lodash";
import {batch} from 'react-redux';
import axios from "axios";
import { newMail } from "./mail";
export const getMails = (folderName) => {


  return (dispatch) =>  {
    return axios.get(`/api/mails/${folderName}`).then((res) =>{
      console.log(res.data);
      batch(() => {dispatch({
        type: constants.GET_MAILS,
        data: res.data
      });
   //   dispatch(newMail(false));
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


