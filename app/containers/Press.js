import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
import pxToDp from '../utils/pxToDp'
import {Header} from '../components'
class Press extends Component {
  static navigationOptions = {
    title: '出版社',
    tabBarLabel: '出版社',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/press.png')}
      />
    ),
  }
  render() {
    return (
      <View >
        <Header {...this.props}/>
        <Text>Press</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: pxToDp(36),
    height: pxToDp(36),
  },
})
const mapStateToProps = ({app, router})=> {
  return {app, router}
}
export default connect(mapStateToProps)(Press)
