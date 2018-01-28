import React, {Component} from 'react'
import { StyleSheet, Text, View, WebView } from 'react-native'
import { connect } from 'react-redux'

class ReadPage extends Component{
  render() {
    const {bookId} = this.props.navigation.state.params
    return (
      <View style={{flex: 1}} >
        <WebView 
          source={{uri: `http://ywjgame.com/readWebView/#/read/${bookId}`}}
          style={{flex: 1}}
        />
      </View>
    )
  }
}

const mapStateToProps = ({app, router, readpage})=> {
  return {app, router, readpage}
}
export default connect(mapStateToProps)(ReadPage)
