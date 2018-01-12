import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import pxToDp from '../utils/pxToDp'
import { TagItem, Header } from '../components'
class Category extends Component {
  static navigationOptions = {
    title: '分类',
    tabBarLabel: '分类',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/category.png')}
      />
    ),
  }
  componentDidMount() {
    this.props.dispatch({type: 'category/getCategory'})
  }
  _keyExtractor = (item, index) => index
  renderItem = ({item})=> {
    return <TagItem itemData={item} {...this.props}/>
  }
  renderHeader = ()=> {
    return <TagItem itemData={{name: '全部', subCategoryDtos:[{uid: 1, name: '全部图书'}]}} {...this.props}/>
  }
  render() {
    const { data } = this.props.category 
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
       <Header {...this.props}/>
       <FlatList 
         keyExtractor = {this._keyExtractor}
         data={data}
         ListHeaderComponent={this.renderHeader}
         renderItem={this.renderItem}
         keyExtractor={this._keyExtractor}
         style={styles.list}
         initialNumToRender={7}
       />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: pxToDp(40),
    height: pxToDp(40),
  },
  list: {
    paddingTop: pxToDp(40),
    paddingBottom: pxToDp(40),
    paddingLeft: pxToDp(30),
    paddingRight: pxToDp(30),
  }
})
const mapStateToProps = ({app, router, category})=> {
  return {app, router, category}
}
export default connect(mapStateToProps)(Category)
