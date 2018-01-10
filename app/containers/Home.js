import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, TextInput, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import pxToDp from '../utils/pxToDp'
import { Header  } from '../components'
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationActions } from '../utils'

class Home extends Component {
  static navigationOptions = {
    headerTitle: '首页',
    tabBarLabel: '首页',
    tabBarIcon: ({ focused, tintColor }) => (
      <Icon name="ios-home" size={pxToDp(46)} color={focused ? tintColor : 'gray'} />
    ),
  }
  openDrawer = ()=> {
    this.props.navigation.navigate('Login')
  }
  handlePress = ()=> {
    this.props.navigation.navigate('Login')
  }
  render() {
    const { coursewareList } = this.props.app
    return (
      <View>
        <Header title='图书详情' {...this.props}/>
        <Text onPress={this.handlePress}>{this.props.router.routes.length<= 1 && '最外'}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: pxToDp(46),
    height: pxToDp(46),
  },
})
const mapStateToProps = ({app, router})=> {
  return {app, router}
}
export default connect(mapStateToProps)(Home)
