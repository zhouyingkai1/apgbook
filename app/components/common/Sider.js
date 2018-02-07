import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native'
import pxToDp from '../../utils/pxToDp'
import TextButton from './TextButton'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'
/**
 * 自定义侧边
 **/
class SidebarView extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      this.props.app.login?(
        <View style={{flex: 1}}>
          <Image style={styles.topBg} source={{uri: 'http://images.mizholdings.com/a0465f5d-b6c2-4000-8e53-f4b30b9fa7aa.jpg'}}/>
          <View style={styles.topMain}>
            <Image style={styles.avatar} source={{uri: 'http://images.mizholdings.com/a0465f5d-b6c2-4000-8e53-f4b30b9fa7aa.jpg?imageView2/2/w/260'}}/>
            <Text numberOfLines={1} style={styles.name}>13625695226</Text>
          </View>  
          <View style={styles.btnList}>
            <TouchableOpacity style={styles.btn}>
              <FontAwesome style={[styles.icon]} name='bell-o'/>
              <Text style={styles.btnTxt}>我的消息</Text>      
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}> 
              <SimpleLineIcons style={[styles.icon, {fontSize: pxToDp(35), marginLeft: pxToDp(2)}]} name='book-open'/>
              <Text style={styles.btnTxt}>我的图书</Text>      
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <FontAwesome style={[styles.icon]} name='heart-o'/>
              <Text style={styles.btnTxt}>我的收藏</Text>      
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity style={styles.bottomBtn}>
              <SimpleLineIcons style={styles.bottomIcon} name='logout'/>
              <Text style={styles.bottomTxt}>退出登录</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomBtn}>
              <Ionicons style={[styles.bottomIcon, {fontSize: pxToDp(46)}]} name='ios-backspace-outline'/>
              <Text style={styles.bottomTxt}>清除缓存</Text>
            </TouchableOpacity>
          </View>        
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.logo}>
            <Image style={styles.logoImg} source={require('../../images/logo.png')}/>
            <TextButton onPress={()=> this.props.navigation.navigate('Login')} btnStyle={styles.btnStyle} textStyle={styles.textStyle} text='点击登录'/>
          </View>
          <Image style={styles.bg} source={{uri: 'http://static.timeface.cn/times/5af6fbd74a9aad326af1e83f5c27e41f.jpg'}}/>
        </View>
      )
    )
  }
};

const styles = StyleSheet.create({
  topBg: {
    width: '100%',
    height: pxToDp(350),
  },
  topMain: {
    position: 'relative',
    zIndex: 10, 
    width: '100%',
    top: -pxToDp(40),
    paddingLeft: pxToDp(20)
  },
  avatar: {
    width: pxToDp(120),
    height: pxToDp(120),
    borderRadius: pxToDp(60),
    borderWidth: pxToDp(2),
    borderColor: '#f1f1f1',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  name: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#333',
    fontSize: pxToDp(36),
    marginTop: pxToDp(20)
  },
  btn: {
    flexDirection: 'row',
    paddingLeft: pxToDp(40),
    marginTop: pxToDp(40),
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  icon: {
    color: '#333',
    fontSize: pxToDp(40),
    marginRight: pxToDp(20)
  },
  btnTxt: {
    fontSize: pxToDp(36)
  },
  btnList: {
    flex: 1, 
    backgroundColor: '#fff', 
    borderTopWidth: pxToDp(1), 
    borderColor: '#e1e1e1',
 },
 bottom: {
   paddingTop: pxToDp(20),
   paddingBottom: pxToDp(20),
   paddingLeft: pxToDp(20),
   paddingRight: pxToDp(20),
   flexDirection: 'row',
   justifyContent: 'space-between'
 },
 bottomBtn: {
   flexDirection: 'row',
   alignItems: 'center'
 },
 bottomIcon: {
   color: '#333',
   marginRight: pxToDp(10),
   fontSize: pxToDp(36)
 },
 bottomTxt: {
   color: '#333',
   fontSize: pxToDp(30)
 },
 bg: {
   width: '100%',
   height: '100%',
   position: 'absolute',
   top: 0,
   left: 0,
   zIndex: -1
 },
 logoImg: {
   width: pxToDp(196),
   height: pxToDp(110)
 },
 logo: {
   alignItems: 'center',
   marginTop: pxToDp(200)
 },
 btnStyle: {
   marginTop: pxToDp(100)
 },
 textStyle: {
   color: '#fff',
   fontSize: pxToDp(34)
 }
});
const mapStateToProps = ({app})=> {
  return {app}
}
export default connect(mapStateToProps)(SidebarView)