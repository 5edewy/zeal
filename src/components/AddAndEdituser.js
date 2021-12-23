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
import { changeValue, adduser } from '../actions'

class AddAndEdituser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', email: '', lat: 22, lng: 22
        };
    }


    add_new_user() {
        const { name, email, lat, lng } = this.state
        const { changeValue, adduser } = this.props
        const data = { name, email, lat, lng }
        const checkdata = { name, email }
        let errors = [];
        let allow = true;
        adduser(data)

        // for (const [key, value] of Object.entries(checkdata)) {
        //     if (!value) {
        //         errors[key] = ["This field is required"];
        //         allow = false;
        //     }
        // }
        // changeValue({ errors });
        // if (allow) {
        //     adduser(data)
        // }
    }

    render() {
        const { name, email } = this.state
        const { errors } = this.props
        return (
            <View style={styles.containerView}>
                <ScrollView
                    scrollEventThrottle={16}
                >
                    <View style={{
                        ...styles.content_view, marginTop: hp(4)
                    }}>
                        <Text> AddAndEdituser </Text>
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
                        <Main_Button
                            onPress={() => this.add_new_user()}
                            text={"Submit"}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        changeValue: (object) => { dispatch(changeValue(object)) },
        adduser: (data) => { dispatch(adduser(data)) }

    };
}
const mapStateToProps = (state) => {
    return {
        errors: state.auth.errors


    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddAndEdituser);
