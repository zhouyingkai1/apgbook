import React, { Component } from 'react'
import {View, FlatList, Text, TouchableOpacity} from 'react-native'
import {BookMenu, Header} from '../components'
import {connect} from 'react-redux'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import pxToDp from '../utils/pxToDp'
class MenuDetail extends Component{
  headerRight = ()=> ( 
    <TouchableOpacity></TouchableOpacity>
  )
  renderItem = ({item})=> {
    return <BookMenu  item={item} {...this.props}/>
  }
  render() {
    const {menu} = this.props.navigation.state.params
    return(
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Header right={this.headerRight} isClose={true} {...this.props}/>
        <FlatList 
          data={menu}
          renderItem={this.renderItem}
          keyExtractor={(item, index)=> index}
          style={{flex: 1, paddingLeft: pxToDp(30), paddingRight: pxToDp(30), paddingBottom: pxToDp(30)}}
          initialNumToRender={16}
        />
      </View>
    )
  }
}
const mapStateToProps = ({app, router})=> {
  return {app, router}
}
export default connect(mapStateToProps)(MenuDetail)