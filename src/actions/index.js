import axios from 'axios';
import {
    LOADING, ERROR, CHANGE_VALUE, DO_LOGIN_SUCCESS,

    // 
    GET_USERS
} from "../constants/";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl, commonheaders, renderError as cAlert } from "../Config";
import Store from '../store/index'
import { navigate, pop, replace, reset } from '../NavigationActions';

export function changeValue(object) {
    return { type: CHANGE_VALUE, payload: object }
};



export const register = (data) => {

    const options = {
        method: 'post',
        url: 'register',
        data,
        noLoader: false
    }
    return async (dispatch) => {
        let response = await PerformRequestOffline(options)
        if (response) {
            await AsyncStorage.setItem('token', JSON.stringify(response.token))
            dispatch({ type: DO_LOGIN_SUCCESS, payload: { token: response.token } })

        }
    }
};



export const login = (data) => {
    const options = {
        method: 'post',
        url: 'login',
        data,
        noLoader: false
    }
    return async (dispatch) => {
        let response = await PerformRequestOffline(options)
        if (response) {
            await AsyncStorage.setItem('token', JSON.stringify(response.token))
            dispatch({ type: DO_LOGIN_SUCCESS, payload: { token: response.token, email: data.email } })

            reset("UserListScreen")
        }
    }
};

export const adduser = (data) => {
    const options = {
        method: 'post',
        url: 'user',
        data,
        noLoader: false
    }
    return async (dispatch) => {
        let response = await PerformRequestOffline(options)
        if (response) {
            // dispatch({ type: DO_LOGIN_SUCCESS, payload: { token: response.token } })

            // reset("UserListScreen")
        }
    }
};


export const addlocation = (data, email) => {

    const options = {
        method: 'post',
        url: 'location/' + email,
        data,
        noLoader: false
    }
    return async (dispatch) => {
        let response = await PerformRequestOffline(options)
        if (response) {
            // dispatch({ type: DO_LOGIN_SUCCESS, payload: { token: response.token } })

            // reset("UserListScreen")
        }
    }
};



export const getuserlocation = (email) => {
    const options = {
        method: 'get',
        url: 'location/' + email,
        noLoader: false
    }
    return async (dispatch) => {
        let response = await PerformRequestOffline(options)
        if (response) {
            // dispatch({
            //     type: GET_USERS, payload: {
            //         users: response.users
            //     }
            // })
        }
    }
}

export const getUsers = () => {
    const options = {
        method: 'get',
        url: 'user',
        noLoader: false
    }
    return async (dispatch) => {
        let response = await PerformRequestOffline(options)
        if (response) {
            dispatch({
                type: GET_USERS, payload: {
                    users: response.users
                }
            })
        }
    }
}





const ErrorAction = (dispatch, error) => {
    dispatch({
        type: ERROR,
        payload: error
    });
};
let progressShown = false

export const PerformRequestOffline = async (options, _action) => {

    let token = Store.getState().auth.token
    const dispatch = Store.dispatch
    const t = options.method == "GET" ? options : null
    // if (!auth_token) {
    //     auth_token = await AsyncStorage.getItem('token', 0)
    // }
    if (token) {
        commonheaders['token'] = token
    }
    if (options.multipart && options.method == "post") {
        // commonheaders['Content-Type'] = 'multipart/form-data'
    } else {
        commonheaders['Content-Type'] = 'application/json'
    }

    let data = options.data,
        method = options.method ? options.method : 'POST',
        config = {
            method: options.method,
            url: baseUrl + options.url,
            headers: { ...commonheaders },
        }

    if (method.toLowerCase() == 'get') {
        config.params = data
    } else {
        config.data = data
    }

    try {

        if (!progressShown && !options.noLoader) {

            dispatch({ type: LOADING, payload: { loading: true } })
            progressShown = true
        }
        const response = await axios(config);


        dispatch({ type: LOADING, payload: { loading: false, loadingText: '' } })
        progressShown = false

        if (response.status == 200) {

            // console.log("Error", response.data);
            let message = response?.data?.message || response?.data?.data?.message
            if (message) {
                cAlert(message)

            }

            if (response.data && response.data.error) {
                cAlert(response.data.error)
            }
            let ret = response.data
            handelActionsSuccess(options, data, ret,)

            return ret;

        }

        let message = response.data && response.data.error ? response.data.error : L('internetConnectionProblem')
        ErrorAction(dispatch, message);
        cAlert(message)
        return false;
    } catch (error) {

        const { response } = error

        // console.log("!", `${options.url}`, error.config);
        // console.log(response);
        progressShown = false
        let message = (response && response.data && response.data.error) ? response.data.error : L('internetConnectionProblem')
        cAlert(message)
        dispatch({ type: LOADING, payload: { loading: false, loadingText: message } })
        if (response) {
            if (response.data && response.data.errors) {
                dispatch({ type: 'ERROR_DATA', payload: { errors: response.data.errors } })
            }

            if (401 == response.status) {
                // newlogout() //
            }
        }


        ErrorAction(dispatch, message);
        cAlert(message)
        return false;
    }

}


const handelActionsSuccess = (options, data, ret) => {

    const dispatch = Store.dispatch
    /*if (['login', 'resetpassword', 'regist'].indexOf(options.url) != -1) {
        reset('LaunchScreen')
    } else*/

    if (['checkCode'].indexOf(options.url) != -1) {

        if (data.flag) {

            navigate("EnterNewpAssword")
            // reset('DrawerComponent')
        } else {
            navigate('Signupusername')

        }

    } else if (['forgetpassword'].indexOf(options.url) != -1) {
        // navigate('Code')
    } else if (['verify'].indexOf(options.url) != -1) {
        // dispatch({ type: CHANGE_VALUE, payload: { code: data.code, email: data.email } })
        // navigate('NewPassword')
    } else if (['contactus'].indexOf(options.url) != -1) {
        // pop()
    } else if (['training'].indexOf(options.url) != -1) {

        dispatch({ type: CHANGE_VALUE, payload: { closeSteps: true } })
    }
    if (options.url == "logout") {
        newlogout()
    }
}