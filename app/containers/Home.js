import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import pxToDp from '../utils/pxToDp'
import { Header  } from '../components'
import Icon from 'react-native-vector-icons/Ionicons';

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
    return (
      <View>
        <Header {...this.props}/>
        <Text onPress={this.handlePress}>{this.props.router.routes.length<= 1 && '最外'}</Text>
      </View>
    )
  }
}


const mapStateToProps = ({app, router})=> {
  return {app, router}
}
export default connect(mapStateToProps)(Home)
