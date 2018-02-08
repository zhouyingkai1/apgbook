import React, {Component} from 'react'
import {Image, View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import pxToDp from '../utils/pxToDp'
import theme from '../utils/theme'
import {TextButton} from '../components'
import Toast from 'react-native-root-toast'
class Login extends Component{
  componentWillMount() {
    this.props.dispatch({
      type: 'login/update',
      payload: {
        timeNumber: 0,
        isLogin: true,
        isChangePwd: false
      }
    })
  }
  update = (name,val)=> {
    this.props.dispatch({
      type: 'login/update',
      payload: {
        [name]: val
      }
    })
  }
  getYzm = ()=> {
    const {timeNumber, phone} = this.props.login
    if(!/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(phone)){
      return Toast.show('请输入正确的手机号')
    }
    if(timeNumber>0) {
      return
    }

    this.refs.codeInput.focus()
    this.props.dispatch({
      type: 'login/getCode',
      payload: {
        phone
      }
    })
    this.update('timeNumber', 60)
    let timer = setInterval(()=> {
      const {timeNumber} = this.props.login
      this.update('timeNumber', timeNumber-1)
      if(timeNumber == 0) {
        clearInterval(timer)
      }
    }, 1000)
  }
  //登陆
  handleLogin = ()=> {
    const {phone, pwd, isYzm} = this.props.login
    if(!phone){
      return Toast.show('请输入账号')
    }else if(!/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(phone)){
      return Toast.show('请输入正确的手机号')
    }
    if(!pwd && isYzm){
      return Toast.show('请输入验证码')
    }
    if(!pwd && !isYzm){
      return Toast.show('请输入密码')
    }
    this.props.dispatch({
      type: 'login/login',
      payload: {
        phone,
        pwd,
        isYzm
      }
    })
  }
  render() {
    const {isYzm, timeNumber, isLogin, isChangePwd} = this.props.login
    return(
      <View style={{flex: 1}}>
         <EvilIcons onPress={()=> this.props.navigation.goBack()} name={'close'} style={[styles.back, styles.noBg]}/>  
         <Image source={require('../images/logo2.png')} style={styles.logo}/>
        {
          isLogin?(
            <View style={{flex: 1}}>
              <View style={styles.inputBox}>
                <TextInput 
                  onChangeText={(val)=> this.update('phone', val)} 
                  underlineColorAndroid="transparent" 
                  keyboardType='numeric' 
                  placeholderTextColor='#c7c7c7' 
                  style={[styles.input, {borderBottomWidth: pxToDp(1), borderColor: '#c7c7c7'}]} 
                  placeholder='请输入手机号'
                />
                  <View style={[styles.yzmInput, !isLogin?{borderBottomWidth: pxToDp(1), borderColor: '#c7c7c7'}:null]}>
                  <TextInput 
                    secureTextEntry={isYzm?false:true} 
                    onChangeText={(val)=> this.update('pwd', val)} 
                    ref='codeInput' 
                    underlineColorAndroid="transparent" 
                    keyboardType='default' 
                    placeholderTextColor='#c7c7c7' 
                    style={[styles.input,{flex: 1}]} 
                    placeholder='请输入'
                  />
                  {
                    isYzm? (
                      <TextButton
                        activeOpacity={timeNumber>0?1:0.6}
                        textStyle={{color: '#fff', fontSize: pxToDp(28)}}
                        text={timeNumber>0?`${timeNumber}s后重新获取`:'获取验证码'}
                        btnStyle={styles.yzmBox} onPress={this.getYzm}
                      />
                    ): null
                  }
                </View>
              </View>
              <TextButton 
                btnStyle={styles.loginBtn} textStyle={{color: '#fff', fontSize: pxToDp(36)}} 
                onPress={this.handleLogin} text='登录'/>
              <View style={styles.btn1}>
                <TextButton onPress={()=> {
                  this.update('isChangePwd', true)
                  this.update('isLogin', false)
                }} textStyle={[styles.textColor]} text='忘记密码'/>
                <TextButton onPress={()=> {
                  this.update('isYzm', !isYzm)
                  this.refs.codeInput.clear()
                }} textStyle={[styles.textColor]} text={isYzm?'账号密码登录':'手机验证码登录'}/>
              </View>
            </View>
          ):(
            <View style={{flex: 1}}>
              <View style={styles.inputBox}>
                <TextInput 
                  onChangeText={(val)=> this.update('phone', val)} 
                  underlineColorAndroid="transparent" 
                  keyboardType='default' 
                  placeholderTextColor='#c7c7c7' 
                  style={[styles.input, {borderBottomWidth: pxToDp(1), borderColor: '#c7c7c7'}]} 
                  placeholder='请输入手机号'
                />
                <View style={[styles.yzmInput, !isLogin?{borderBottomWidth: pxToDp(1), borderColor: '#c7c7c7'}:null]} >
                  <TextInput 
                    onChangeText={(val)=> this.update('pwd', val)} 
                    underlineColorAndroid="transparent" keyboardType='default' 
                    placeholderTextColor='#c7c7c7' 
                    style={[styles.input, {flex: 1}]} 
                    placeholder='请输入'
                  />
                  <TextButton
                    activeOpacity={timeNumber>0?1:0.6}
                    textStyle={{color: '#fff', fontSize: pxToDp(28)}}
                    text={timeNumber>0?`${timeNumber}s后重新获取`:'获取验证码'}
                    btnStyle={styles.yzmBox} onPress={this.getYzm}
                  />
                </View>
                <TextInput 
                  secureTextEntry={true} 
                  onChangeText={(val)=> this.update('phone', val)} 
                  underlineColorAndroid="transparent" 
                  keyboardType='default' 
                  placeholderTextColor='#c7c7c7' 
                  style={[styles.input, {borderBottomWidth: pxToDp(1), borderColor: '#c7c7c7'}]} 
                  placeholder='请输入密码'
                />
                <TextInput 
                  secureTextEntry={true} 
                  onChangeText={(val)=> this.update('phone', val)} 
                  underlineColorAndroid="transparent" 
                  keyboardType='default' 
                  placeholderTextColor='#c7c7c7' 
                  style={[styles.input,]} 
                  placeholder='请确认密码'
                />
               </View>
              <TextButton 
                btnStyle={styles.loginBtn} 
                textStyle={{color: '#fff', fontSize: pxToDp(36)}} 
                onPress={this.handleLogin} 
                text={isChangePwd?'修改密码':'注册'}
              />
            </View>
          )
        }
        <View style={styles.download}>
          <Text style={[styles.textColor, styles.noBg]}>{isLogin?'没有':'已有'}账号？</Text>
          <TextButton  onPress={()=>{
            this.update('isLogin', !isLogin)
            this.update('isChangePwd', false)
          }} textStyle={{color: theme.mainColor, fontSize: pxToDp(26)}} text={isLogin?'立即注册':'立即登录'}/>
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
  alignItems: 'center',
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