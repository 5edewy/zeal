import React, { useState, useRef, useEffect } from 'react';
import { Text, Animated, View, TextInput } from 'react-native';
import styles, { borderColor, contentColor, hp, wp, bluesky_color, Primary_color } from '../style/styles';

const Input = ({
    label,
    value,
    onChangeText,
    returnKeyType,
    secureTextEntry,
    keyboardType,
    error,
    maxLength,
    editable,
    right,
    left,
    inputStyle,
    containerStyle,
    InputcontainerStyle,
    rounded,
    marginT,
    placeholderTextColor,
    marginB,
    bg_forradios,
    addinionalstyle,
    multiline,
    numofline,
    pointerEvents,
    onSubmitEditing


}) => {
    const mounted = useRef();
    let _animatedIsFocused = new Animated.Value(value === '' ? 0 : 1);
    const [colorBorder, setColorBorder] = useState(borderColor);
    const [textColor, setTextColor] = useState(contentColor);
    const [isFocused, setFocused] = useState(false);
    const onBlur = () => {
        setTextColor(contentColor)
        setColorBorder(borderColor)
        setFocused(false)
    }
    const onFocus = () => {
        setTextColor(Primary_color)
        setColorBorder(Primary_color)
        setFocused(true)
    }

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            Animated.spring(_animatedIsFocused, {
                toValue: (isFocused || value !== '') ? 1 : 0,
                friction: 11,
                tension: 4,
                useNativeDriver: true
            }).start();
        }
    });
    const labelStyle = {
        position: 'absolute',
        transform: [
            { translateX: (isFocused || value !== '') ? 0 : 0 },
            { translateY: (isFocused || value !== '') ? hp(-3) : hp(2) },
            { scale: (isFocused || value !== '') ? 0.9 : 1 }
        ],
        fontSize: (isFocused || value !== '') ? wp(3.2) : wp(3.4),
        color: textColor,
        // fontFamily: fontRegular,
    };
    return (
        <View style={[{
            marginTop: marginT ? marginT : 0,
            marginBottom: marginB ? marginB : hp(5)
        }, containerStyle]}>
            {!rounded ?
                <Animated.Text style={labelStyle/*[styles.inputLable, { color: textColor }]*/}>
                    {label}
                </Animated.Text> : null}
            <View style={[styles.inputContainer, { borderBottomColor: error ? 'red' : colorBorder },
                InputcontainerStyle, rounded ? {
                    ...styles.inputRadius,
                    backgroundColor: bg_forradios ? bg_forradios : '#fff',
                    ...addinionalstyle
                } : null]}>
                {right && right}
                <TextInput
                    onSubmitEditing={onSubmitEditing}
                    pointerEvents="none"
                    multiline={multiline}
                    numberOfLines={numofline}
                    editable={editable}
                    onBlur={rounded ? null : onBlur}
                    onFocus={rounded ? null : onFocus}
                    placeholder={rounded && label}
                    blurOnSubmit
                    secureTextEntry={secureTextEntry}
                    maxLength={maxLength}
                    returnKeyType={returnKeyType}
                    keyboardType={keyboardType}
                    style={[styles.inputStyle, { color: textColor }, inputStyle]}
                    onChangeText={onChangeText}
                    value={value}
                    selectionColor={bluesky_color}
                    placeholderTextColor={placeholderTextColor}
                />
                {left && left}
            </View>
            {error ?
                <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};
export { Input };