import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native'
import { connect } from 'react-redux'
import pxToDp from '../utils/pxToDp'
import { Header, HomeItem } from '../components'
import theme from '../utils/theme'
class PressDetail extends Component {
  componentDidMount = ()=> {
    const {pressId} = this.props.navigation.state.params
    this.props.dispatch({
      type: 'pressdetail/getHotBook',
      payload: {
        pressId
      }
    })
    this.props.dispatch({
      type: 'pressdetail/getLastBook',
      payload: {
        pressId
      }
    })
  }
  render() {
    const {hot, newBook} = this.props.pressdetail
    const {pressName} = this.props.navigation.state.params
    
    return ( 
      <View style={styles.container}>
        <Header right={()=> {}} title='出版社' {...this.props}/>
        <ScrollView>
          <View style={styles.banner}>
            <Image resizeMode='cover' style={styles.bannerImg} source={require('../images/pressBack.jpg')} />
            <Text style={[styles.txt, styles.name]}>{pressName}</Text>
            <Text style={[styles.txt]}>-官方旗舰店-</Text>
          </View>
          <View style={[{flex: 1}]}>
            <HomeItem noMore={true} title='热门推荐' type={1} data={hot} {...this.props}/>
            <HomeItem noMore={true} title='最新图书' type={2} data={newBook} {...this.props}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e9e9'
  },
  banner: {
    height: pxToDp(240),
    width: theme.screenWidth,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bannerImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  txt: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: theme.mainColor,
    fontSize: pxToDp(34)
  },
  name: {
    marginBottom: pxToDp(20),
    fontSize: pxToDp(40)
  }
})

const mapStateToProps = ({app, pressdetail})=> {
  return {app, pressdetail}
}
export default connect(mapStateToProps)(PressDetail)
