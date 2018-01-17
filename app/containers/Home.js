import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import pxToDp from '../utils/pxToDp'
import { Header, HomeItem } from '../components'
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import theme from '../utils/theme'
class Home extends Component {
  static navigationOptions = {
    headerTitle: '首页',
    tabBarLabel: '首页',
    tabBarIcon: ({ focused, tintColor }) => (
      <Icon name="ios-home" size={pxToDp(46)} color={focused ? tintColor : 'gray'} />
    ),
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  openDrawer = ()=> {
    this.props.navigation.navigate('Login')
  }
  handlePress = ()=> {
    this.props.navigation.navigate('Login')
  }
  onRefresh = ()=> {
    this.props.dispatch({
      type: 'home/update',
      payload: {
        isRefreshing: true
      }
    })
    this.props.dispatch({type: 'home/getBookData'})
  }
  render() {
    const {data, isRefreshing} = this.props.home
    return ( 
      <View style={styles.container}>
        <Header {...this.props}/> 
        <ScrollView 
           refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.onRefresh}
              tintColor={theme.mainColor}
              progressBackgroundColor="#ffff00" 
            />
          }
        >
          <Swiper dotColor={'white'}  
              activeDotColor={theme.mainColor} 
              autoplay={true} 
              style={{height: pxToDp(268)}}
              paginationStyle={{position:'absolute',bottom: pxToDp(20), justifyContent: 'flex-end', right: pxToDp(20)}}
            >
            <Image resizeMode='cover' style={styles.banner} source={require('../images/banner.jpg')} />
            <Image resizeMode='cover' style={styles.banner} source={require('../images/banner.jpg')} />
          </Swiper>
          <View style={[{flex: 1}]}>
            <HomeItem title='热门推荐' type={1} data={data.type1} {...this.props}/>
            <HomeItem title='最新推荐' type={2} data={data.type2} {...this.props}/>
            <HomeItem title='免限推荐' type={5} data={data.type3} {...this.props}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: theme.screenWidth,
    height: pxToDp(268),
  }
})

const mapStateToProps = ({app, router, home})=> {
  return {app, router, home}
}
export default connect(mapStateToProps)(Home)
