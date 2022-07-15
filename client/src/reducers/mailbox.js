import constants from "../utils/constants";

const initialState = {
  mails: [],
  loading: false,
  error: false,
  activeMailId: ""
};

export default function reducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case constants.MAILS_FETCH_ERROR:
      newState = { ...state, mails: [], error: true, loading: false };
      break;
    case constants.LOADING_MAILS:
      newState = { ...state, mails: [], error: false, loading: true };
      break;
    case constants.GET_MAILS:
      newState = {
        error: false,
        loading: false,
        mails: action.data,
        activeMailId: ""
      };
      break;
    case constants.SELECT_MAIL:
      newState = {
        ...state,
        activeMailId: action.data
      };
      break;
    default:
      break;
  }
  console.log(" New state is ", newState);
  return newState;
}
