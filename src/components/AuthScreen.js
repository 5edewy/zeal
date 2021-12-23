import React, { Component } from 'react';
import { Input, Main_Button, VectorIcon } from './Assets/common'
import {
    View, Text, ScrollView, TouchableWithoutFeedback,
    TouchableOpacity,
    LayoutAnimation, Platform, UIManager,
} from 'react-native';
import styles, {
    gray_color, hp, white_color, wp, Primary_color,
    black_color
} from './Assets/style/styles';
import { connect } from 'react-redux';
import { register, changeValue, login } from '../actions'



if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

class AuthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            secure_password: true,
            statue: 0

        };
        props.changeValue({ errors: [] })
    }


    do_submit() {
        const { email, password, name } = this.state
        const { changeValue, register } = this.props
        const data = { email, password, name }
        let errors = [];
        let allow = true;
        for (const [key, value] of Object.entries(data)) {
            if (!value) {
                errors[key] = ["This field is required"];
                allow = false;
            }
        }
        changeValue({ errors });
        if (allow) {
            register(data)
        }
    }


    do_login() {
        const { email, password, } = this.state
        const { changeValue, login } = this.props
        const data = { email, password }
        let errors = [];
        let allow = true;
        for (const [key, value] of Object.entries(data)) {
            if (!value) {
                errors[key] = ["This field is required"];
                allow = false;
            }
        }
        changeValue({ errors });
        if (allow) {
            login(data)
        }
    }

    render() {

        // STATE:
        const { email, name, password, secure_password, statue } = this.state

        // PROPS:
        const { errors } = this.props
        return (
            <View style={styles.containerView}>
                <ScrollView
                    scrollEventThrottle={16}
                >
                    <View style={{
                        ...styles.content_view, marginTop: hp(4)
                    }}>
                        <Text style={styles.header_Title}>Welcome</Text>

                        <View style={styles.register_btn_container}>
                            <TouchableOpacity
                                onPress={() => {
                                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                    this.setState({ statue: 0 })
                                }}
                                activeOpacity={.8}>
                                <View style={{
                                    ...styles.register_btn,
                                    backgroundColor: statue == 0 ? Primary_color : '#f1f1f1',

                                }}>
                                    <Text style={{
                                        ...styles.subtitle,
                                        color: statue == 0 ? white_color : gray_color
                                    }}>Login</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => {
                                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

                                    this.setState({ statue: 1 })
                                }}
                                activeOpacity={.8}>
                                <View style={{
                                    ...styles.register_btn,
                                    backgroundColor: statue == 1 ? Primary_color : '#f1f1f1',

                                }}>
                                    <Text style={{
                                        ...styles.subtitle,
                                        color: statue == 1 ? white_color : gray_color
                                    }}>Register</Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                        {statue == 1 ?
                            <View style={styles.content_view}>
                                <Input
                                    keyboardType={"default"}
                                    marginT={hp(5)}
                                    onChangeText={name => this.setState({ name })}
                                    value={name}
                                    error={errors['name']}
                                    label={'Name'}
                                />

                                <Input
                                    keyboardType={"email-address"}
                                    onChangeText={email => this.setState({ email })}
                                    value={email}
                                    error={errors['email']}
                                    label={'Email'}
                                />

                                <Input
                                    secureTextEntry={secure_password}
                                    keyboardType={"default"}
                                    onChangeText={password => this.setState({ password })}
                                    value={password}
                                    error={errors['password']}
                                    label={'Password'}
                                    left={

                                        <TouchableWithoutFeedback onPress={() => this.setState({
                                            secure_password: !secure_password
                                        })}>
                                            <VectorIcon
                                                type="Octicons" name={secure_password ? "eye-closed" : "eye"}
                                                color={gray_color}
                                                size={wp(4.2)} />
                                        </TouchableWithoutFeedback>
                                    }
                                />
                                <Main_Button
                                    onPress={() => this.do_submit()}
                                    text={"Register"}
                                />
                            </View>
                            :
                            statue == 0 ?
                                <View style={styles.content_view}>


                                    <Input
                                        marginT={hp(5)}
                                        keyboardType={"email-address"}
                                        onChangeText={email => this.setState({ email })}
                                        value={email}
                                        error={errors['email']}
                                        label={'Email'}
                                    />

                                    <Input
                                        secureTextEntry={secure_password}
                                        keyboardType={"default"}
                                        onChangeText={password => this.setState({ password })}
                                        value={password}
                                        error={errors['password']}
                                        label={'Password'}
                                        left={

                                            <TouchableWithoutFeedback onPress={() => this.setState({
                                                secure_password: !secure_password
                                            })}>
                                                <VectorIcon
                                                    type="Octicons" name={secure_password ? "eye-closed" : "eye"}
                                                    color={gray_color}
                                                    size={wp(4.2)} />
                                            </TouchableWithoutFeedback>
                                        }
                                    />
                                    <Main_Button
                                        onPress={() => this.do_login()}
                                        text={"Login"}
                                    />
                                </View>
                                : null}
                    </View>


                </ScrollView>

            </View>
        );
    }
}




function mapDispatchToProps(dispatch) {
    return {
        changeValue: (object) => { dispatch(changeValue(object)) },
        register: (data) => { dispatch(register(data)) },
        login: (data) => { dispatch(login(data)) }

    };
}
const mapStateToProps = (state) => {
    return {
        errors: state.auth.errors


    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
