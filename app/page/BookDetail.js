import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, InteractionManager, AlertIOS } from 'react-native'
import { connect } from 'react-redux'
import pxToDp from '../utils/pxToDp'
import {Header, BookItem, Loading, TextButton, Alert} from '../components'
import Toast from 'react-native-root-toast'
import theme from '../utils/theme'
import Icon from 'react-native-vector-icons/Ionicons'
import HTMLView from 'react-native-htmlview';
class BookDetail extends Component {
  componentDidMount() { 
    const { bookId: newBookId} = this.props.navigation.state.params
    const { bookId } = this.props.bookdetail
  }
  update = (name, val)=> {
    this.props.dispatch({
      type: 'bookdetail/update',
      payload: {
        [name]: val
      }
    })
  }
  fetchData = (current) => {
    this.props.dispatch({
      type: 'bookdetail/getData',
      payload: {
        current: current || 1,
        type: this.props.navigation.state.params.type
      }
    })
  } 
  handle = ()=> {
    console.log(111)
    this.update('visible', true)
  }
  render() {
    const {params} = this.props.navigation.state
    const {visible} = this.props.bookdetail
    const htmlContent = `<h1 hidden="hidden">封面</h1><p style="text-align: center;"><img alt="cover" src="http://www.apgbook.com/bookview/uploads/epub/resource/5a0a5229e4b0befe98d749f6/Images/cover.jpg" width="585" /></p>`
    return (
      <View style={{flex: 1}} >
        <Header title={params.title} {...this.props}/>
        <Alert
         onBackdropPress={()=> this.update('visible', false)} 
         txt='为了您的使用体验，请允许我使用手机相册请允许我使用手机相册' 
         visible={visible}
         onOkPress={()=> Toast.show('确定')}
         okTxt='可以打开'
         />
         <HTMLView
          value={htmlContent}
          stylesheet={styles}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
 
})
const mapStateToProps = ({app, router, bookdetail})=> {
  return {app, router, bookdetail}
}
export default connect(mapStateToProps)(BookDetail)
