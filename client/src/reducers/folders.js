import constants from "../utils/constants";

const initialState = {
  folders: [],
  loading: false,
  error: false,
  activeFolder: ""
};

export default function reducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case constants.FOLDER_FETCH_ERROR:
      newState = { ...state, folders: [], error: true, loading: false };
      break;
    case constants.LOADING_FOLDERS:
      newState = { ...state, folders: [], error: false, loading: true };
      break;
    case constants.GET_FOLDERS:
      newState = {
        error: false,
        loading: false,
        folders: action.data,
        activeFolder: ""
      };
      break;
    case constants.SELECT_FOLDER:
      newState = { ...state, activeFolder: action.data };
      break;
    default:
      break;
  }
  console.log(" New state is ", newState);
  return newState;
}
