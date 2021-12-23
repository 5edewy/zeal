import React, { Component } from 'react';
import { Input, Main_Button, VectorIcon } from './Assets/common'
import {
    View, Text, ScrollView, TouchableWithoutFeedback,
    TouchableOpacity,
    LayoutAnimation, Platform, UIManager, FlatList,
} from 'react-native';
import styles, {
    gray_color, hp, white_color, wp, Primary_color,

} from './Assets/style/styles';
import { connect } from 'react-redux';
import { getUsers } from '../actions'

class UserListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        props.getUsers()
    }
    _render_userList = ({ item, index }) => {
        const { navigation } = this.props
        return (
            <TouchableOpacity
                activeOpacity={.9}
                onPress={() => navigation.navigate("UserDetailsScreen", {
                    item: item
                })}>
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
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                        width: wp(55),
                        justifyContent: 'space-around',
                        marginTop: hp(2)
                    }}>
                        <TouchableOpacity
                            activeOpacity={.8}>
                            <View style={styles.edit_delete_btn}>
                                <Text style={{
                                    ...styles.subtitle, color: white_color
                                }}>{'Edit'}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.8}>
                            <View style={{
                                width: wp(25), height: hp(4.2), backgroundColor: white_color,
                                alignItems: 'center',
                                justifyContent: 'center', borderRadius: wp(2), elevation: 2
                            }}>
                                <Text style={{
                                    ...styles.subtitle, color: Primary_color
                                }}>{'Delete'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                </View>
            </TouchableOpacity>
        )
    }
    render() {
        const { users, navigation } = this.props
        const dtat = [{}, {}]
        return (
            <View style={styles.containerView}>
                <ScrollView
                    scrollEventThrottle={16}
                >
                    <View style={{
                        ...styles.content_view, marginTop: hp(4)
                    }}>
                        <Text>{'#USERS : ' + users.length}</Text>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            style={{
                                alignSelf: "center",
                            }}
                            ItemSeparatorComponent={() => <View style={{ height: hp(1) }} />}
                            data={users}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this._render_userList} />
                    </View>

                    <Text onPress={() => navigation.navigate("AddAndEdituser")}>add</Text>
                </ScrollView>
            </View>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {

        getUsers: () => { dispatch(getUsers()) },

    };
}
const mapStateToProps = (state) => {
    return {
        users: state.main_info.users,

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserListScreen);