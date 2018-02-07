import React, {Component} from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, PanResponder} from 'react-native'
import { connect } from 'react-redux'
import {Header, ListFooter, BookItem, LoadingWithBg} from '../components'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import pxToDp from '../utils/pxToDp'
import Toast from 'react-native-root-toast'
class SearchPage extends Component {
  searchData = (params={})=> {
    const {keyword, page, pageSize} =this.props.search
    if(!!!keyword){
      return Toast.show('请输入搜索内容')
    }
    const form = {
      pageNumber: params.page || page,
      pageSize: params.pageSize || pageSize || 10,
      searchKey: keyword
    }
    this.props.dispatch({
      type: 'search/searchData',
      payload: form
    }) 
  }
  update = (name, val)=> {
    this.props.dispatch({
      type: 'search/update',
      payload: {
        [name]: val
      }
    })
  }
  renderItem = ({item})=> {
    return (
      <View>
        <Text>{item.bookName}</Text>
      </View>
    )
  }
  fetchMore = ()=> { 
    const {page, total, isRefreshing, canFetchMore} = this.props.search
    if(isRefreshing || page >= total) {
      return
    }
    this.update('isRefreshing', true) 
    let currentPage = page + 1
    this.searchData({page: currentPage})
  }
  render() {
    const {data, total, page, isSearch, isRefreshing } = this.props.search
    return (
      <View style={{flex: 1}}>
        <Header right={()=> null} {...this.props} title='搜索'/>
        <View style={{paddingLeft: pxToDp(20), paddingRight: pxToDp(20)}}>
          <View style={styles.inputBox}>
            <EvilIcons style={[styles.noneBg, {marginLeft: pxToDp(20)}]} name="search" size={pxToDp(50)} color={'#aaa'} />
            <TextInput 
              autoFocus={true}
              returnKeyType={'search'}
              style={styles.input}
              onChangeText={value=> this.update('keyword', value)}
              onSubmitEditing={()=> this.searchData({page: 1})}
            />
          </View>
        </View>
        <View style={{flex: 1}}>
          {isSearch?
            <FlatList 
              data = {data}
              renderItem={({item})=> <BookItem item={item} {...this.props}/>}
              keyExtractor={(item, index)=> index}
              ListFooterComponent={()=> <ListFooter page={page} total={total}/>}
              style={{flex: 1}}
              onEndReachedThreshold={0.1}
              onEndReached={this.fetchMore} 
            /> : null
          }
        </View>
        {
          isSearch?<LoadingWithBg isShow={isRefreshing}/>:null
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  noneBg: {
    backgroundColor: 'transparent',
  },
  inputBox: {
    height: pxToDp(60),
    backgroundColor: '#d9d9d9',
    marginTop: pxToDp(10),
    marginBottom: pxToDp(10),
    borderRadius: pxToDp(16),
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1
  },
})
const mapStateToProps = ({app, search})=> {
  return {app, search}
}
export default connect(mapStateToProps)(SearchPage)
