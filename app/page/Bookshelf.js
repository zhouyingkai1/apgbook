import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import pxToDp from '../utils/pxToDp'
import {Header, BookItem, Loading, TextButton} from '../components'
import Toast from 'react-native-root-toast'
import theme from '../utils/theme'
import Icon from 'react-native-vector-icons/Ionicons'
class Bookshelf extends Component {
  componentDidMount() { 
    // 根据categoryId 和 type 分别请求不同的接口
    // type 和上一次type 一样， 并且有数据时， 不请求数据
    const {type: newType, categoryId: newCategoryId} = this.props.navigation.state.params
    const {type, current, total, categoryId} = this.props.bookshelf
    if(newType) {
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
            type: newType,
            categoryId: ''
          }
        })
      }); 
    }else{
      newCategoryId != categoryId&&this.update('isLoading', true) 
      InteractionManager.runAfterInteractions(()=>{  
        let currentPage = current
        if(newCategoryId == categoryId && current == 0 ) {
          currentPage = current + 1
          this.queryCategoryBook(currentPage, newCategoryId)
        }
        if(newCategoryId != categoryId ) {
          currentPage = 1
          this.queryCategoryBook(currentPage, newCategoryId)
        }
        this.props.dispatch({
          type: 'bookshelf/update',
          payload: {
            current: currentPage,
            categoryId: newCategoryId,
          }
        })
      }); 
    }
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
  queryCategoryBook = (current)=> {
    this.props.dispatch({
      type: 'bookshelf/queryCategoryBook',
      payload: {
        current: current || 1,
        categoryId: this.props.navigation.state.params.categoryId 
      }
    })
  }
  fetchMore = ()=> { 
    const {current, total, data, isRefreshing, type, categoryId} = this.props.bookshelf
    if(isRefreshing || current >= total) {
      return
    }
    this.update('isRefreshing', true) 
    let currentPage = current + 1
    this.update('current', currentPage) 
    if(!categoryId){
      this.fetchData(currentPage)
    }else{
      this.queryCategoryBook(currentPage)
    }
  }
  _keyExtractor = (item, index) => index
  renderFooter = () => {
    const {current, total} = this.props.bookshelf 
    return (
      <View style={{ marginTop: pxToDp(20), marginBottom: pxToDp(30), justifyContent: 'center', paddingLeft: pxToDp(40), paddingRight: pxToDp(40)}}>
        {
          current >= total ? 
          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.noMoreLine}></View>
            <Text style={styles.full}>没有更多了～</Text>
          </View>
          : <Loading />
        }
      </View>
    )
  }
  changeSort = (orderType)=> {
    const {orderType: type} = this.props.bookshelf
    if(orderType == type && orderType!= 4){
      return
    }
    const {orderBy} = this.props.bookshelf
    this.update('orderType', orderType)
    orderType == 4 && type ==4 && this.update('orderBy', Number(!orderBy))
    this.queryCategoryBook(1)
  }
  child = ()=> {
    const {orderType, orderBy} = this.props.bookshelf
    return <Icon name={orderBy? 'md-arrow-dropup': 'md-arrow-dropdown'} style={{marginLeft: pxToDp(6)}} color={orderType==4? '#000': '#b1b1b1'} size={pxToDp(20)}/>
  }
  render() {
    const {params} = this.props.navigation.state
    const {data, isRefreshing, current, total, isLoading, orderType} = this.props.bookshelf
    return (
      <View style={{flex: 1}} >
        <Header title={params.title} {...this.props}/>
        <View style={styles.sort}>
          <TextButton onPress={()=> this.changeSort(1)} text='最热' btnStyle={{marginRight: pxToDp(60)}} textStyle={{color: orderType == 1? '#000': '#b1b1b1', fontSize: pxToDp(30) }}/>
          <TextButton onPress={()=> this.changeSort(2)} text='最新' btnStyle={{marginRight: pxToDp(60)}} textStyle={{color: orderType == 2? '#000': '#b1b1b1', fontSize: pxToDp(30) }}/>
          <TextButton onPress={()=> this.changeSort(3)} text='销量' btnStyle={{marginRight: pxToDp(60)}} textStyle={{color: orderType == 3? '#000': '#b1b1b1', fontSize: pxToDp(30) }}/>
          <TextButton Child={this.child} onPress={()=> this.changeSort(4)} text='价格' btnStyle={{flexDirection: 'row', alignItems: 'center', marginRight: pxToDp(60)}} textStyle={{color: orderType == 4? '#000': '#b1b1b1', fontSize: pxToDp(30) }}/>
        </View>
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
    color: '#666',
    position: 'absolute',
    top: 0,
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
  },
  noMoreLine: {
    height: 1,
    marginTop: pxToDp(16),
    width: (theme.screenWidth - 30),
    backgroundColor: '#c7c7c7'
  },
  sort: {
    flexDirection: 'row',
    paddingLeft: pxToDp(22),
    paddingTop: pxToDp(22),
    paddingBottom: pxToDp(22)
  }
})
const mapStateToProps = ({app, router, bookshelf})=> {
  return {app, router, bookshelf}
}
export default connect(mapStateToProps)(Bookshelf)
