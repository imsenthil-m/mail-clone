import constants from "../utils/constants";
import axios from "axios";
export const getContacts = () => {
  return (dispatch) =>  {
    return axios.get('/api/contacts').then((res) =>{
      dispatch({
        type: constants.GET_CONTACTS,
        data: res.data
      });
    })
  }
};


export const addContact = (contactDetails) => {
  return (dispatch) =>  {
    return axios.post('/api/contact', {...contactDetails}).then((res) =>{
      dispatch(getContacts());
    })
  }
}