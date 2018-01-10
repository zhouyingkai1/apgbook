import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
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
  componentDidMount() {
  
 }
  render() {
    const {data} = this.props.home
    return (
      <View style={styles.container}>
        <Header {...this.props}/>
        <Swiper dotColor={'white'} 
            activeDotColor={theme.mainColor} 
            autoplay={true} 
            style={{height: pxToDp(268)}}
            paginationStyle={{position:'absolute',bottom: pxToDp(20), justifyContent: 'flex-end', right: pxToDp(20)}}
          >
          <Image resizeMode='cover' style={styles.banner} source={{uri: 'http://images.mizholdings.com/a0465f5d-b6c2-4000-8e53-f4b30b9fa7aa.jpg'}} />
          <Image resizeMode='cover' style={styles.banner} source={{uri: 'http://images.mizholdings.com/a0465f5d-b6c2-4000-8e53-f4b30b9fa7aa.jpg'}} />
        </Swiper>
        <View style={[{flex: 1}]}>
          <HomeItem title='热门推荐' type={1} data={data.type1} {...this.props}/>
        </View>
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
