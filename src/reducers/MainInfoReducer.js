import {
    GET_USERS

} from '../constants';

const INITAL_STATE = {
    users: []
};


export default (state = INITAL_STATE, action) => {
    switch (action.type) {

        case 'RESET_APP':
            return { ...state };
        case GET_USERS:
            return {
                ...state, ...action.payload
            }


        default:
            return state;
    }
};