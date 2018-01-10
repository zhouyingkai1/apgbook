import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import { Header } from '../components'

import { createAction, NavigationActions } from '../utils'

class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  }
  handlePress = ()=> {
    console.log(this.props,'dddd')
  }
  render() {
    return (
      <View style={styles.container}>
        <Header {...this.props}/>
        <Text onPress={this.handlePress}>{this.props.router.index> 0 && '不是最外'}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   
  },
})
const mapStateToProps = ({app, router})=> {
  return {app, router}
}
export default connect(mapStateToProps)(Login)
