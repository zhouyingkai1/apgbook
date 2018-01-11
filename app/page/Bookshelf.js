import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import pxToDp from '../utils/pxToDp'
import {Header, BookItem} from '../components'
import Toast from 'react-native-root-toast'
class Bookshelf extends Component {
  componentDidMount() {
    this.fetchData()
  }
  renderItem = ({item})=> {
    return <BookItem item={item} {...this.props}/>
  }
  update = (name, val)=> {
    this.props.dispatch({
      type: 'bookshelf/update',
      payload: {
        [name]: val
      }
    })
  }
  fetchData = (current) => {
    this.props.dispatch({
      type: 'bookshelf/getData',
      payload: {
        current: current || 1,
        type: this.props.navigation.state.params.type
      }
    })
  }
  fetchMore = ()=> {
    const {current, total, data} = this.props.bookshelf
    let currentPage = current + 1
    this.update('isRefreshing', true)
    this.update('current', currentPage)
    this.fetchData(currentPage)
    console.log(data,'data')
    console.log(current,'current')
    console.log(total,'total')
  }
  _keyExtractor = (item, index) => index
  render() {
    const {params} = this.props.navigation.state
    const {data, isRefreshing, current, total} = this.props.bookshelf
    return (
      <View >
        <Header title={params.title} {...this.props}/>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          initialNumToRender={4}
          showsHorizontalScrollIndicator= {false}
          onEndReachedThreshold={0.5}
          onEndReached={this.fetchMore}
          refreshing={isRefreshing}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: pxToDp(36),
    height: pxToDp(36),
  },
})
const mapStateToProps = ({app, router, bookshelf})=> {
  return {app, router, bookshelf}
}
export default connect(mapStateToProps)(Bookshelf)
