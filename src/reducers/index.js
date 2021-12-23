import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MainInfoReducer from './MainInfoReducer';


export default RootReducer = combineReducers({
    auth: AuthReducer,
    main_info: MainInfoReducer,

});
