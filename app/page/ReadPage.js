import React, {Component} from 'react'
import { StyleSheet, Text, View, WebView } from 'react-native'
import { connect } from 'react-redux'
import {Loading, Header} from '../components'
class ReadPage extends Component{
  renderLoading = ()=> <Loading />
  render() {
    const {bookId, chapterId, bookName} = this.props.navigation.state.params
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}} >
        <Header title={bookName} {...this.props}/>
        <WebView 
          source={{uri: chapterId?`http://ywjgame.com/readWebView/#/read/${bookId}?chapterId=${chapterId}`:`http://ywjgame.com/readWebView/#/read/${bookId}`}}
          style={{flex: 1}}
          scrollEnabled={false}
          startInLoadingState={true}
          renderLoading={this.renderLoading}
        />
      </View>
    )
  }
}

const mapStateToProps = ({app, router, readpage})=> {
  return {app, router, readpage}
}
export default connect(mapStateToProps)(ReadPage)
