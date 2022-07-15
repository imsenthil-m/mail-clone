import { combineReducers } from "redux";
import folders from "./folders";
import mailbox from "./mailbox";
import mail from "./mail";
import contacts from './contacts';

export default combineReducers({
  folders,
  mailbox,
  mail,
  contacts
});
