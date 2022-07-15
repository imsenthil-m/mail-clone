import constants from "../utils/constants";
import {newMail} from './mail';

import axios from "axios";
export const getFolders = () => {
  return (dispatch) =>  {
    return axios.get('/api/folders').then((res) =>{
      dispatch({
        type: constants.GET_FOLDERS,
        data: res.data
      });
      dispatch(newMail(false));
    })
  }
};

export const selectFolder = (folderName) => {
  return {
    type: constants.SELECT_FOLDER,
    data: folderName
  };
};

export const addFolder = folderName => {
  return (dispatch) =>  {
    return axios.post('/api/folder', {folderName}).then((res) =>{
      dispatch(getFolders());
    })
  }
}