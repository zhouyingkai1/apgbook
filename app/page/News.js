import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'
import {Header, ListFooter, TextButton} from '../components'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { NavigationActions } from '../utils'
import pxToDp from '../utils/pxToDp'
import Toast from 'react-native-root-toast'
class News extends Component{
  componentDidMount = ()=> {
    this.getNews()
  }
  getNews = (page)=> {
    this.props.dispatch({
      type: 'news/getNews',
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
  renderItem = ({item})=> {
    let strArr = item.templateStr.split('>')
    let userName = strArr[2].replace(/\D/g, '')
    let userId = strArr[1].replace(/\D/g, '')
    let time = strArr[7].replace(/<\/div/g, '')
    let txt = strArr[3].split('，')[0]
    let bookIdStr = strArr[3].split('，')[1].replace(/\D/g,'')
    let bookId = bookIdStr.substring(0, bookIdStr.length-1)
    return (
      <View style={styles.item}>
        <Image source={{uri: item.avatar}} style={styles.avatar}/>
        <View>
          <View>
            <TextButton 
              text={userName}
              onPress={()=> Toast.show(userId)}
              barStyle={{}}
              textStyle={{color: 'blue', lineHeight: pxToDp(50)}}
            />
            <TextButton 
              text={txt}
              onPress={()=> this.props.navigation.navigate('BookDetail', {bookId})}
              barStyle={{}}
              textStyle={{color: '#000'}}
            />
          </View>
          <Text>{time}</Text>
        </View>
      </View>
    )
  }
  fetchMore = ()=> { 
    const {page, total, isRefreshing} = this.props.news
    if(isRefreshing || page >= total) {
      return
    }
    this.props.dispatch({
      type: 'news/update',
      payload: {
        isRefreshing: true
      }
    })
    let currentPage = page + 1
    this.getNews(currentPage)
  }
  render() {
    const {data, total, page} = this.props.news
    return (
      <View style={{flex: 1, backgroundColor: '#e9e9e9'}} >
        <Header right={this.headRight} title='我的消息' {...this.props}/>
        <FlatList 
          style={{flex: 1}}
          data={data}
          renderItem = {this.renderItem}
          keyExtractor={(item, index)=> index}
          ListFooterComponent = {()=> <ListFooter page={page} total={total}/>}
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
  item: {
    paddingTop: pxToDp(25),
    paddingBottom: pxToDp(25),
    paddingRight: pxToDp(27),
    paddingLeft: pxToDp(27),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  avatar: {
    width: pxToDp(80),
    height: pxToDp(80),
    borderRadius: pxToDp(40),
    marginRight: pxToDp(20)
  }
})
const mapStateToProps = ({app, news})=> {
  return {app, news}
}
export default connect(mapStateToProps)(News)
