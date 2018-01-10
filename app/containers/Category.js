import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
import pxToDp from '../utils/pxToDp'

class Category extends Component {
  static navigationOptions = {
    title: '分类',
    tabBarLabel: '分类',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/category.png')}
      />
    ),
  }
  render() {
    return (
      <View >
       <Text>Category</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: pxToDp(40),
    height: pxToDp(40),
  },
})
const mapStateToProps = ({app})=> {
  return {app}
}
export default connect(mapStateToProps)(Category)
