import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import pxToDp from '../utils/pxToDp'
import { Header, HomeItem } from '../components'
class Rank extends Component {
  static navigationOptions = {
    title: '排行',
    tabBarLabel: '排行',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/rank.png')}
      />
    ),
  }
  componentDidMount() {
    for(let i=1; i<6; i++) {
      this.props.dispatch({
        type: 'rank/getData',
        payload: {
          type: i
        }
      })
    }
  }
  render() {
    const {data1, data2, data3, data4, data5} = this.props.rank
    return (
      <View style={{flex: 1, backgroundColor: '#e9e9e9'}}>
        <Header noBack={true} {...this.props}/>
        <ScrollView style={{flex: 1}}>
          <HomeItem title='畅销榜' type={1} data={data1} {...this.props}/>
          <HomeItem title='新书榜' type={2} data={data2} {...this.props}/>
          <HomeItem title='热搜榜' type={3} data={data3} {...this.props}/>
          <HomeItem title='人气榜' type={4} data={data4} {...this.props}/>
          <HomeItem title='免费榜' type={5} data={data5} {...this.props}/>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: pxToDp(40),
    height: pxToDp(40),
  },
})
const mapStateToProps = ({app, router, rank})=> {
  return {app, router, rank}
}
export default connect(mapStateToProps)(Rank)
