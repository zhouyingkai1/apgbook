import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import pxToDp from '../utils/pxToDp'
import {Header, PressList} from '../components'
import Swiper from 'react-native-swiper'
import theme from '../utils/theme'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
class Press extends Component {
  static navigationOptions = {
    title: '出版社',
    tabBarLabel: '出版社',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/press.png')}
      />
    ),
  }
  componentDidMount = ()=> {
    this.props.dispatch({
      type: 'press/getPressList'
    })
  }
  render() {
    const {data} = this.props.press
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Header noBack={true} {...this.props}/>
        <ScrollView style={{flex: 1}}>
          <Swiper dotColor={'white'}  
            activeDotColor={theme.mainColor} 
            autoplay={true} 
            style={{height: pxToDp(268)}}
            paginationStyle={{position:'absolute',bottom: pxToDp(20), justifyContent: 'flex-end', right: pxToDp(20)}}
          >
            <Image resizeMode='cover' style={styles.banner} source={require('../images/banner.jpg')} />
            <Image resizeMode='cover' style={styles.banner} source={require('../images/banner.jpg')} />
          </Swiper>
          <View style={{height: pxToDp(20), backgroundColor: '#e9e9e9'}}></View>
          <View style={styles.box}>
            <View style={styles.top}>
              <View style={styles.border}>
                <Text>入驻机构</Text>
              </View>
              {/* <TouchableOpacity onPress={()=> this.props.navigation.navigate('PressList')} style={styles.more}>
                <Text style={{color: '#999', fontSize: pxToDp(30)}}>全部 <Icon color={'#999'} name='arrow-right' size={pxToDp(26)}/></Text>
              </TouchableOpacity> */}
            </View>
            <PressList data={data} {...this.props}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: pxToDp(36),
    height: pxToDp(36),
  },
  banner: {
    width: theme.screenWidth,
    height: pxToDp(268),
  },
  box: {
    marginTop: pxToDp(20),
    backgroundColor: '#fff',
    paddingLeft: pxToDp(28),
    paddingRight: pxToDp(28),
    paddingBottom: pxToDp(10),
  },
  top: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: pxToDp(20)
  },
  border: {
    paddingLeft: pxToDp(20),
    borderLeftWidth: pxToDp(8),
    borderColor: theme.mainColor
  },
})
const mapStateToProps = ({app, press, router})=> {
  return {app, press, router}
}
export default connect(mapStateToProps)(Press)
