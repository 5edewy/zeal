import React from 'react';
import { View, ActivityIndicator, Text, Modal } from 'react-native';
import { widthPercentageToDP as scale, heightPercentageToDP as verticalScale } from 'react-native-responsive-screen'


const Spinner = (props) => {
  if (props.size === 'large') {
    return (
      <View style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 999,
        width: scale('100%'),
        height: verticalScale('110%'),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        elevation: scale('100%'),
        flex: 1,
        flexGrow: 10,
        flexShrink: 10
      }}>
        <View
          style={{
            position: 'absolute',
            zIndex: 999,
            backgroundColor: '#fff',
            width: scale('50%'),
            height: verticalScale('10%'),
            borderRadius: 5,
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}
        >
          <ActivityIndicator animating color={'black'} size='large' />
          <Text
            style={{ fontSize: 12, color: '#424242', }}
          >{"loading"}</Text>
        </View>
      </View>
    )
  }
};

export { Spinner };
