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
  const {title, backTitle, right, left, noBack, isClose} = props
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
      <View style={{flex: 1, paddingLeft: pxToDp(20)}}>
        {
          !noBack? 
            <TouchableOpacity style={styles.left} onPress={()=> requestAnimationFrame(()=> props.navigation.goBack())}>
            {isClose?
              <EvilIcons name={'close'} style={[styles.noneBg,{position: 'relative', left: -pxToDp(8)}]} size={pxToDp(60)} color={'#fff'} />
              :
              <Icon name={'arrow-left'} style={[styles.noneBg,{position: 'relative', left: -pxToDp(8)}]} size={pxToDp(40)} color={'#fff'} />
            }              
            </TouchableOpacity>
          : 
            <View>
              {
                props.app.login?
                  <TouchableOpacity style={[styles.left]} onPress={()=> props.navigation.navigate('DrawerOpen')}>
                    <Image 
                    source={{uri: 'http://images.mizholdings.com/a0465f5d-b6c2-4000-8e53-f4b30b9fa7aa.jpg?imageView2/2/w/30'}}
                    style={styles.avatar}/>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={[styles.left]} onPress={()=> handlelogin()}>
                    <FontIcon style={styles.noneBg} name="user-circle" size={pxToDp(46)} color={'#aaa'} />
                  </TouchableOpacity>
              }
              </View>
          }
      </View>
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
        {right? right() : 
          <EvilIcons onPress={()=> props.navigation.navigate('SearchPage')} style={[{transform: [{rotate: '90deg'}]},styles.noneBg]} name="search" size={pxToDp(60)} color={'#aaa'} />
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
    justifyContent: 'center',
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1,
    paddingRight: pxToDp(20)
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: pxToDp(60),
    height: pxToDp(60),
    borderRadius: pxToDp(30),
  },
  txt: {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  titleTxt: {
    fontSize: pxToDp(36),
  },
  logo: {
    width: pxToDp(98),
    height: pxToDp(54)
  },
  noneBg: {
    backgroundColor: 'rgba(0,0,0,0)'
  }
});

export default Header