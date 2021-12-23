'use strict';
import { I18nManager, Platform, StyleSheet, Dimensions } from 'react-native';

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export const wp = widthPercentageToDP;
export const hp = heightPercentageToDP;


// main colors 
export const black_color = "#000"
export const white_color = "#fff"
export const gray_color = "#8b8989"
export const light_gray_color = "#cccc"
export const light_Hover_color = "rgba(241,241,241,.4)"
export const red_color = "#e95945"
export const Primary_color = "#228be6"
export const Secondary_color = "#e99f94"


//  Other Colors 
export const Hover_color = "#efebfa"
export const contentColor = '#8b8989'
export const borderColor = '#eaeaff'
export const textInputColor = '#000'
export const vectorIconColor = '#b8b8d2'
export const backgroundlightcolor = 'rgb(249,249,249)'

// directions 
const rtl = I18nManager.isRTL
const textDir = Platform.select({
  ios: rtl ? 'right' : 'left',
  android: rtl ? 'right' : 'left',
})
const flexDir = Platform.select({
  ios: rtl ? 'flex-start' : 'flex-end',
  android: rtl ? 'flex-start' : 'flex-end',
})


const styles = StyleSheet.create({
  // backIcon
  back_boc: {
    width: wp(10),
    alignItems: 'center',
    justifyContent: "center",
    paddingTop: hp(1),
  },
  back_box_ii: {
    alignItems: "center",
    justifyContent: 'center'
  },
  // input style
  inputContainer: {
    borderBottomColor: borderColor,
    borderBottomWidth: wp(.4),
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  inputRadius: {
    backgroundColor: '#fff',
    borderWidth: wp(0.5),
    borderColor: borderColor,
    borderRadius: wp(3),

  },
  inputImage: {
    width: wp(5),
    height: hp(3),
    resizeMode: 'contain'
  },
  inputStyle: {
    borderWidth: 0,
    textAlign: textDir,
    flex: 1,
    color: contentColor,
    fontSize: wp(3.7),
  },
  inputLable: {

    color: textInputColor,
    fontSize: wp(3.5),
    alignSelf: flexDir,
    marginBottom: hp(1),
  },
  errorText: {

    fontSize: wp(3),
    color: 'red',
    marginTop: 0,
    alignSelf: flexDir
  },
  back_view_icon: {
    width: wp(12), height: hp(6), backgroundColor: 'transparent',
    alignItems: 'center', justifyContent: 'center'
  },

  content_view: {
    width: wp(92),
    alignSelf: 'center'
  },
  header_Title: {
    fontSize: wp(5),
    color: black_color,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: wp(3.6),
    color: gray_color,
    fontWeight: '600'
  }
  ,
  register_btn: {
    width: wp(30), height: hp(4.5),
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(2),
  },
  register_btn_container: {
    width: wp(80), alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center', flexDirection: 'row',
    marginTop: hp(4),
  },
  containerView: {
    flex: 1,
    backgroundColor: white_color
  },
  edit_delete_btn: {
    width: wp(25), height: hp(4.2), backgroundColor: Primary_color,
    alignItems: 'center',
    justifyContent: 'center', borderRadius: wp(2), elevation: 2
  }


});

export default styles;
