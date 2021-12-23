import { LayoutAnimation, UIManager, Platform, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native'
import Toast from 'react-native-root-toast';
import { hp, wp } from './components/Assets/style/styles';


export let baseUrl =
    'http://10.0.2.2:3000/';
export let commonheaders = {
    Accept: 'application/json',

};


export function renderError(message) {
    let toast = null;
    return (toast = Toast.show(
        message,
        {
            textStyle: {
                fontSize: wp(3.5),
                color: '#fff',
                lineHeight: hp(3),
            },
        },
        {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: "#6aa4e4",
            opacity: 0.4,
            delay: .2,
            // backgroundColor:'red' ,
            // shadowColor:'red'

        },
        setTimeout(function () {
            Toast.hide(toast);
        }, 4000),
    ));
}
