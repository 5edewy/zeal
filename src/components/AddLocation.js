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
import { changeValue, addlocation } from '../actions'

class AddLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: '', lng: '',
            email: props?.route?.params?.email
        };
    }


    addnewlocation() {
        const { lat, lng } = this.state
        const { changeValue, addlocation, email } = this.props
        const data = { lat: Number(lat), lng: Number(lng), }
        let errors = [];
        let allow = true;
        addlocation(data, email)


    }

    render() {
        const { lat, lng } = this.state
        const { errors } = this.props
        // console.log(email);
        return (
            <View style={styles.containerView}>
                <ScrollView
                    scrollEventThrottle={16}
                >
                    <View style={{
                        ...styles.content_view, marginTop: hp(4)
                    }}>
                        <Text> locations </Text>
                        <Input
                            keyboardType={"default"}
                            marginT={hp(5)}
                            onChangeText={lat => this.setState({ lat })}
                            value={lat}
                            error={errors['lat']}
                            label={'LAT'}
                        />

                        <Input
                            keyboardType={"email-address"}
                            onChangeText={lng => this.setState({ lng })}
                            value={lng}
                            error={errors['lng']}
                            label={'LNG'}
                        />
                        <Main_Button
                            onPress={() => this.addnewlocation()}
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
        addlocation: (data, email) => { dispatch(addlocation(data, email)) }

    };
}
const mapStateToProps = (state) => {
    return {
        errors: state.auth.errors,
        email: state.auth.email,


    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddLocation);
