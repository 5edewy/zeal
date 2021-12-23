import React, { Component } from 'react';
import { Input, Main_Button, VectorIcon } from './Assets/common'
import {
    View, Text, ScrollView, TouchableWithoutFeedback,
    TouchableOpacity,
    LayoutAnimation, Platform, UIManager, FlatList,
} from 'react-native';
import styles, {
    gray_color, hp, white_color, wp, Primary_color,
    black_color
} from './Assets/style/styles';
import { connect } from 'react-redux';
import { getuserlocation } from '../actions'
class UserDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props?.route?.params?.item
        };
        this.getlocation()
    }
    getlocation() {
        const { item } = this.state
        const { getuserlocation } = this.props
        const email = item.email
        getuserlocation(email)
    }
    render() {
        const { item } = this.state
        const email = item.email
        const { navigation } = this.props
        return (

            <View style={styles.containerView}>
                <ScrollView
                    scrollEventThrottle={16}
                >
                    <View style={{
                        ...styles.content_view, marginTop: hp(4)
                    }}>
                        <View style={{
                            width: wp(90),
                            backgroundColor: '#f1f1f1', borderRadius: wp(2),
                            elevation: 2,
                            marginVertical: hp(.5), paddingHorizontal: wp(3),
                            paddingVertical: hp(1)
                        }}>
                            <Text style={{
                                fontSize: wp(4),
                                color: Primary_color,
                                fontWeight: '900'
                            }}>{item?.name}</Text>
                            <Text style={{
                                ...styles.subtitle
                            }}>{item?.email}</Text>



                        </View>

                        <Text onPress={() => navigation.navigate("AddLocation", {
                            email: email
                        })}> addlocations </Text>
                    </View>
                </ScrollView>

            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {

        getuserlocation: (email) => { dispatch(getuserlocation(email)) },

    };
}
const mapStateToProps = (state) => {
    return {
        // users: state.main_info.users,

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsScreen);