import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'
import {Header, ListFooter, TextButton, BookItem} from '../components'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { NavigationActions } from '../utils'
import pxToDp from '../utils/pxToDp'
import Toast from 'react-native-root-toast'
class Collect extends Component{
  componentDidMount = ()=> {
    this.getBook()
  }
  getBook = (page)=> {
    this.props.dispatch({
      type: 'news/getBook',
      payload: {
        page
      }
    })
  }
  resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'AppDrawerNavigator'})
    ]
  })
  headRight = ()=> {
    return (
      <TouchableOpacity style={styles.headerRight} 
        onPress={()=> requestAnimationFrame(()=> this.props.navigation.dispatch(this.resetAction))}
      >
        <SimpleLineIcons name='home' size={pxToDp(40)} color='#fff'/>
      </TouchableOpacity>
    )
  }
  fetchMore = ()=> { 
    const {bookPage, bookTotal, bookIsRefreshing} = this.props.news
    if(bookIsRefreshing || bookPage >= bookTotal) {
      return
    }
    this.props.dispatch({
      type: 'news/update',
      payload: {
        bookIsRefreshing: true
      }
    })
    let currentPage = bookPage + 1
    this.getBook(currentPage)
  }
  render() {
    const {bookData, bookTotal, bookPage} = this.props.news
    return (
      <View style={{flex: 1, backgroundColor: '#e9e9e9'}} >
        <Header right={this.headRight} title='收藏图书' {...this.props}/>
        <FlatList 
          style={{flex: 1}}
          data={bookData}
          renderItem = {({item})=> <BookItem item={item} {...this.props}/>}
          keyExtractor={(item, index)=> index}
          ListFooterComponent = {()=> <ListFooter page={bookPage} total={bookTotal}/>}
          onEndReachedThreshold={0.1}
          onEndReached={this.fetchMore} 
          ItemSeparatorComponent={()=> <View style={{borderBottomWidth: pxToDp(1), borderColor: '#c7c7c7'}}></View>}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  headerRight: {
    backgroundColor: 'rgba(0,0,0,0)', 
    justifyContent: 'center', 
    alignItems: 'flex-end', 
    width: pxToDp(60), 
    height: pxToDp(60),
  },
})
const mapStateToProps = ({app, news})=> {
  return {app, news}
}
export default connect(mapStateToProps)(Collect)
