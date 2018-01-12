import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import pxToDp from '../utils/pxToDp'
import {Header, BookItem, Loading} from '../components'
import Toast from 'react-native-root-toast'
class Bookshelf extends Component {
  componentDidMount() { 
    // type 和上一次type 一样， 并且有数据时， 不请求数据
    const {type: newType} = this.props.navigation.state.params
    const {type, current, total} = this.props.bookshelf
    
    newType != type&&this.update('isLoading', true) 
    InteractionManager.runAfterInteractions(()=>{  
      let currentPage = current
      if(newType == type && current == 0 ) {
        currentPage = current + 1
        this.fetchData(currentPage, newType)
      }

      if(newType != type ) {
        currentPage = 1
        this.fetchData(currentPage, newType)
      }

      this.props.dispatch({
        type: 'bookshelf/update',
        payload: {
          current: currentPage,
          type: newType
        }
      })
    });  
    
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
    const {current, total, data, isRefreshing} = this.props.bookshelf
    if(isRefreshing || current >= total) {
      return
    }
    this.update('isRefreshing', true) 
    let currentPage = current + 1
    this.update('current', currentPage) 
    this.fetchData(currentPage)
  }
  _keyExtractor = (item, index) => index
  renderFooter = () => {
    const {current, total} = this.props.bookshelf 
    return (
      <View style={{ marginTop: pxToDp(20), marginBottom: pxToDp(20)}}>
        {
          current >= total ? <Text style={styles.full}>已加载全部数据</Text>
          : <Loading />
        }
      </View>
    )
  }
  render() {
    const {params} = this.props.navigation.state
    const {data, isRefreshing, current, total, isLoading} = this.props.bookshelf
    return (
      <View style={{flex: 1}} >
        <Header title={params.title} {...this.props}/>
        {
          isLoading?
            <Loading /> :
            <FlatList
              data={data}
              renderItem={this.renderItem}
              keyExtractor={this._keyExtractor}
              initialNumToRender={4}
              showsHorizontalScrollIndicator= {false}
              onEndReachedThreshold={0.3}
              onEndReached={this.fetchMore} 
              ListFooterComponent={this.renderFooter}
              style={{flex: 1}}
            />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: pxToDp(36),
    height: pxToDp(36),
  },
  full: {
    textAlign: 'center',
    
    color: '#666'
  }
})
const mapStateToProps = ({app, router, bookshelf})=> {
  return {app, router, bookshelf}
}
export default connect(mapStateToProps)(Bookshelf)
