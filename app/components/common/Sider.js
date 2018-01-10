import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    Alert,
    DeviceEventEmitter,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native'

/**
 * 自定义导航
 **/
export default class SidebarView extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <View>
                <View style={[styles.header,styles.headImageView]}>
                    <Text
                        onPress={()=>{
                            this.props.navigation.navigate("Sign")
                        }}
                    >
                        抽屉1
                    </Text>
                </View>
                <View style={[styles.header,styles.headImageView]}>
                    <Text>
                        抽屉2
                    </Text>
                </View>
                <View style={[styles.header,styles.headImageView]}>
                    <Text
                        onPress={()=>{
                            this.props.navigation.navigate("Found")
                        }}
                    >
                        抽屉3
                    </Text>
                </View>
            </View>
        )
    }

};

let heightItem = 50
let heightHead = 200
let styles = StyleSheet.create({

    textItem: {
        fontSize: 16,
        fontFamily: 'PingFang SC',
        color: '#333333'
    },

    header: {
        height: 200,
        width: '100%',
        paddingTop: 20,
        // backgroundColor:"pink"
    },
    headImageView: {
        // marginTop: 30,
        // marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userPic: {
        width: 60,
        height: 60,
        //borderWidth:5,
        borderRadius: 30,
        borderColor: "#000",
    },
    headText: {
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: "#ef3845",
        fontFamily: "PingFang SC",
    },
    userIphone: {
        color: "#333333",
        fontSize: 18,
        fontFamily: "PingFang SC",
    },
});
