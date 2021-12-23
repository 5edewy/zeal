import React from 'react';
import { Image, Platform, StatusBar, Text, TouchableOpacity, TouchableWithoutFeedback, View, } from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './components/AuthScreen';
import UserListScreen from './components/UserListScreen';
import AddAndEdituser from './components/AddAndEdituser';
import AddLocation from './components/AddLocation';
import UserDetailsScreen from './components/UserDetailsScreen';



const Stack = createStackNavigator();


export default function RouterNavigator() {

    return (

        <Stack.Navigator

            initialRouteName="AuthScreen"

        // screenOptions={{


        //     // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        //     headerStyle: {
        //         elevation: 0,
        //         borderBottomWidth: 0,
        //         // backgroundColor: "#f0f",
        //         //  height: hp(10)
        //     },
        //     headerTitleStyle: {
        //         fontFamily: fontmedum,
        //         fontSize: wp(4.7),
        //         color: black_color,
        //     },
        //     animationEnabled: true,
        //     animationTypeForReplace: "pop",
        //     // cardStyle: { backgroundColor: 'transparent' },
        //     cardOverlayEnabled: true,
        //     cardStyleInterpolator: ({ current: { progress } }) => ({

        //         // cardStyle: {
        //         //     opacity: progress.interpolate({
        //         //         inputRange: [0, 0.5, 0.9, 1],
        //         //         outputRange: [0, 0.25, 0.7, 1],
        //         //         extrapolate: 'clamp',
        //         //     }),

        //         // },
        //         containerStyle: {
        //             opacity: progress.interpolate({
        //                 inputRange: [0.3, 1],
        //                 outputRange: [0.2, 1],
        //                 extrapolate: "extend",
        //             }),

        //         },
        //         // overlayStyle: {
        //         //     opacity: progress.interpolate({
        //         //         inputRange: [.8, 1],
        //         //         outputRange: [0, .16],
        //         //         extrapolate: 'extend',
        //         //     }),
        //         // },
        //     }),
        // }}
        >
            <Stack.Screen
                name="AuthScreen"
                component={AuthScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="UserListScreen"
                component={UserListScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="AddAndEdituser"
                component={AddAndEdituser}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="AddLocation"
                component={AddLocation}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="UserDetailsScreen"
                component={UserDetailsScreen}
                options={{ headerShown: false }}
            />




        </Stack.Navigator>
    );
}