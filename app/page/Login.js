import React, {Component} from 'react'
import {Image, View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import pxToDp from '../utils/pxToDp'
import theme from '../utils/theme'
import {TextButton} from '../components'
class Login extends Component{
  update = (name,val)=> {
    this.props.dispatch({
      type: 'login/update',
      payload: {
        [name]: val
      }
    })
  }
  getYzm = ()=> {
    const {timeNumber} = this.props.login
    if(timeNumber>0) {
      return
    }
    
  }
  render() {
    const {isYzm, timeNumber} = this.props.login
    return(
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <EvilIcons onPress={()=> this.props.navigation.goBack()} name={'close'} style={[styles.back, styles.noBg]}/>  
          <Image source={require('../images/logo2.png')} style={styles.logo}/>
          <View style={styles.inputBox}>
            <TextInput underlineColorAndroid="transparent" keyboardType='numeric' placeholderTextColor='#c7c7c7' style={[styles.input, {borderBottomWidth: pxToDp(1), borderColor: '#c7c7c7'}]} placeholder='请输入手机号'/>
            <View style={styles.yzmInput}>
              <TextInput underlineColorAndroid="transparent" keyboardType='default' placeholderTextColor='#c7c7c7' style={[styles.input,{flex: 1}]} placeholder='请输入'/>
              {
                isYzm? (
                  <TouchableOpacity style={styles.yzmBox} onPress={this.getYzm} >
                    <Text style={{color: '#fff', fontSize: pxToDp(28)}}>{timeNumber>0?`${timeNumber}s后重新获取`:'获取验证码'}</Text>
                  </TouchableOpacity>
                ): null
              }
           </View>
          </View>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={{color: '#fff', fontSize: pxToDp(36)}}>登录</Text>
          </TouchableOpacity>
          <View style={styles.btn1}>
            <TextButton textStyle={[styles.textColor]} text='忘记密码'/>
            <TextButton onPress={()=> this.update('isYzm', !isYzm)} textStyle={[styles.textColor]} text={isYzm?'账号密码登录':'手机验证码登录'}/>
          </View>
        </View>
        <View style={styles.download}>
          <Text style={[styles.textColor, styles.noBg]}>没有账号？</Text>
          <TextButton textStyle={{color: theme.mainColor, fontSize: pxToDp(26)}} text='立即注册>'/>
        </View>
        <Image style={styles.bg} source={{uri: 'http://static.timeface.cn/times/5af6fbd74a9aad326af1e83f5c27e41f.jpg'}}/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
 bg: {
   width: '100%',
   height: '100%',
   position: 'absolute',
   top: 0,
   left: 0,
   zIndex: -1
 },
 noBg: {
  backgroundColor: 'rgba(0,0,0,0)'
 },
 back: {
   marginTop: theme.toolbar.paddingTop,
   color: '#fff',
   fontSize: pxToDp(60),
   marginLeft: pxToDp(10)
 },
 logo: {
   width: pxToDp(305),
   height: pxToDp(139),
   marginTop: pxToDp(50),
   alignSelf: 'center'
 },
 inputBox: {
   borderTopWidth: pxToDp(1),
   borderBottomWidth: pxToDp(1),
   borderColor: '#c7c7c7',
   paddingLeft: pxToDp(40),
   marginTop: pxToDp(70),
 },
 input: {
   height: pxToDp(80),
   color: '#c7c7c7',
   padding: 0,
 },
 loginBtn: {
   height: pxToDp(80),
   backgroundColor: theme.mainColor,
   marginTop: pxToDp(40),
   borderRadius: 8,
   width: theme.screenWidth - pxToDp(80),
   alignSelf: 'center',
   justifyContent: 'center',
   alignItems: 'center'
 },
 btn1: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   paddingLeft: pxToDp(40),
   paddingRight: pxToDp(40),
   marginTop: pxToDp(40)
 },
 textColor: {
   color: '#b4b4b4'
 },
 download: {
   marginBottom: pxToDp(30),
   justifyContent: 'center',
   flexDirection: 'row'
 },
 yzmInput: {
  flexDirection: 'row',
  alignItems: 'center'
 },
 yzmBox: {
  backgroundColor: '#ff6b50',
  borderRadius: 3,
  paddingLeft: pxToDp(10),
  paddingRight: pxToDp(10),
  height: pxToDp(50),
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: pxToDp(20)
 }
});
const mapStateToProps = ({app, login})=> {
  return {app, login}
}
export default connect(mapStateToProps)(Login)