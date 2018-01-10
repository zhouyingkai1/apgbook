import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    StatusBar
} from 'react-native'
import pxToDp from '../../utils/pxToDp'
import theme from '../../utils/theme'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Toast from 'react-native-root-toast'
/**
 * 自定义导航
 **/
const Header = (props)=> {
  const {title, backTitle, right, left} = props
  console.log(right,'right')
  const handlelogin = ()=> {
    props.dispatch({
      type: 'app/updateState',
      payload: {
        login: true
      }
    })
  }
  return (
    <LinearGradient
      locations={[0.2,0.8]}
      colors={['#2b2a31', '#38373d',]} style={styles.header}
      >
      <StatusBar barStyle='light-content'/>
      {
        props.router.index > 0? 
          <TouchableOpacity style={styles.left} onPress={()=> props.navigation.goBack()}>
            <Icon name="arrow-left" size={pxToDp(40)} color={'#fff'} />
          </TouchableOpacity>
        : 
          <View>
            {
              props.app.login?
                <TouchableOpacity style={[styles.left, {marginLeft: pxToDp(20)}]} onPress={()=> props.navigation.navigate('DrawerOpen')}>
                  <Image 
                  source={{uri: 'http://images.mizholdings.com/a0465f5d-b6c2-4000-8e53-f4b30b9fa7aa.jpg?imageView2/2/w/30'}}
                  style={styles.avatar}/>
                </TouchableOpacity>
                :
                <TouchableOpacity style={[styles.left, {marginLeft: pxToDp(20)}]} onPress={()=> handlelogin()}>
                  <FontIcon name="user-circle" size={pxToDp(46)} color={'#aaa'} />
                </TouchableOpacity>
            }
            </View>
        }
        <View style={styles.title}>
          {
            title? <Text style={[styles.titleTxt, styles.txt]}>{title}</Text>
            :
            <Image 
              source={require('../../images/logo.png')}
              style={styles.logo}/>
          }
        </View>
        <View style={styles.right}>
          {right? right : 
            <EvilIcons onPress={()=> Toast.show('search')} style={{transform: [{rotate: '90deg'}]}} name="search" size={pxToDp(60)} color={'#aaa'} />
          }
        </View>
      </LinearGradient>
  )
};

const styles = StyleSheet.create({
  header: {
    height: theme.toolbar.height,
    paddingTop: theme.toolbar.paddingTop,
    flexDirection: 'row',
    alignItems: 'center'
  },
  left: {
    width: pxToDp(60),
    justifyContent: 'center',
    alignItems: 'center'
  },
  right: {
    width: pxToDp(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: pxToDp(60),
    height: pxToDp(60),
    borderRadius: pxToDp(30),
  },
  txt: {
    color: '#fff'
  },
  titleTxt: {
    fontSize: pxToDp(36),
  },
  logo: {
    width: pxToDp(98),
    height: pxToDp(54)
  }
});

export default Header