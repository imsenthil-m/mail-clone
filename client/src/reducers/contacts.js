import constants from "../utils/constants";

const initialState = {
  contacts: [],
  loading: false,
  error: false
};

export default function reducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case constants.CONTACTS_FETCH_ERROR:
      newState = { ...state, folders: [], error: true, loading: false };
      break;
    case constants.LOADING_CONTACTS:
      newState = { ...state, folders: [], error: false, loading: true };
      break;
    case constants.GET_CONTACTS:
      newState = {
        error: false,
        loading: false,
        contacts: action.data,
      };
      break;
    default:
      break;
  }
  console.log(" New state is ", newState);
  return newState;
}
