import React, {Component} from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, Animated } from 'react-native'
import { connect } from 'react-redux'
import {Header} from '../components'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import pxToDp from '../utils/pxToDp'
import LinearGradient from 'react-native-linear-gradient';
class TestScrollBar extends Component {
  constructor(props){
    super(props)
    this.state={
      data: Array(20),
      topValue: new Animated.Value(0)
    }
  }
  _scrollSinkX = (e)=> {
    const listHeight = this.state.data.length * pxToDp(65) + pxToDp(20)
    const scrollTop = e.nativeEvent.contentOffset.y
    Animated.timing(this.state.topValue, {
      toValue: (scrollTop/listHeight>1?1: (scrollTop/listHeight<0?0:scrollTop/listHeight)),
      duration: 0,
    }).start();
  }
 
  render() {
    const { data, topValue } = this.state
    return (
      <View style={{flex: 1}}>
        <Header right={()=> null} {...this.props} title='搜索'/>
        <View style={styles.inputBox}>
          <EvilIcons style={[styles.noneBg]} name="search" size={pxToDp(60)} color={'#aaa'} />
          <TextInput 
            autoFocus={true}
            returnKeyType={'search'}
            style={styles.input}
          />
        </View>
        <View style={{height: pxToDp(635), marginTop: 100, paddingBottom: pxToDp(20), paddingTop: pxToDp(20), backgroundColor: '#f8e8b0'}}>
          <FlatList
            data={data}
            renderItem={(item)=> <View style={styles.item}><Text style={{color: '#fff'}}>测试滚动条</Text></View>}
            keyExtractor={(item, index)=> index}
            showsVerticalScrollIndicator={false}
            style={styles.list}
            onScroll={this._scrollSinkX}
          />
          <View style={[styles.barBg, ]}>
              <Animated.View style={{
                  height: `${700/data.length}%`,
                  top: topValue.interpolate({
                    inputRange: [0,1],
                    outputRange: [0, pxToDp(590 - 7/data.length*590)]
                  })
                }}>
                <LinearGradient
                  locations={[0.2,0.8]}
                  colors={['#ffe034', '#ffc60f',]} style={[styles.bar]}
                >
                </LinearGradient>
              </Animated.View>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  inputBox: {
    height: pxToDp(30)
  },
  input: {

  },
  item: {
    height: pxToDp(65),
    justifyContent: 'center',
    backgroundColor: '#e3be84',
    marginBottom: pxToDp(20),
    paddingLeft: pxToDp(20),
    borderRadius: 6,
  },
  list: {
    flex: 1,
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(60),
  },
  barBg: {
    width: pxToDp(18),
    height: pxToDp(595),
    backgroundColor: '#cba164',
    position: 'absolute',
    right: pxToDp(20),
    top: pxToDp(20),
    borderRadius: 4
  },
  bar: {
    borderRadius: 4,
    height: '100%',
  },
  barMain: {
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute'
  }
})
const mapStateToProps = ({app, search})=> {
  return {app, search}
}
export default connect(mapStateToProps)(TestScrollBar)
