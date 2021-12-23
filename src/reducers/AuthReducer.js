
import {
  LOADING, ERROR, CHANGE_VALUE, DO_LOGIN_SUCCESS
} from '../constants';
const INITAL_STATE = {
  loading: false, errors: [],
  error: '', errorMsg: '',
  token: '', email: ''
};
export default (state = INITAL_STATE, action) => {

  switch (action.type) {
    case 'RESET_APP':
      return { ...INITAL_STATE };
    case "LOG_OUT":
      return { ...state, user: null, api_token: '', code: '', phone: '' }
    case LOADING:
      return { ...state, ...action.payload };
    case ERROR:
      return { ...state, errorMsg: action.payload }
    case CHANGE_VALUE:
      return { ...state, ...action.payload, }
    case DO_LOGIN_SUCCESS:
      return { ...state, ...action.payload }
    case "ERROR_DATA":
      return { ...state, ...action.payload }
    default:
      return state;
  }

}
