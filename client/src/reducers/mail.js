import constants from "../utils/constants";

const initialState = {
  content: {},
  loading: false,
  error: false,
  isNewMailOpen: false
};

export default function reducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case constants.MAILS_FETCH_ERROR:
      newState = { ...state, content: {}, error: true, loading: false };
      break;
    case constants.LOADING_MAIL:
      newState = { ...state, content: {}, error: false, loading: true };
      break;
    case constants.GET_MAIL:
      newState = {
        error: false,
        loading: false,
        content: action.data
      };
      break;
    case constants.SELECT_MAIL:
      newState = {
        ...state,
        activeMailId: action.data
      };
      break;
    case constants.NEW_MAIL:
      newState = {
        ...state,
        ...action.data
      }
      break;
    default:
      break;
  }
  console.log(" New state is ", newState);
  return newState;
}
