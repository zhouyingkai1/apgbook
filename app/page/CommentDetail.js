import React, { Component } from 'react'
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {Comment, Header, Loading} from '../components'
import {connect} from 'react-redux'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import pxToDp from '../utils/pxToDp'
import theme from '../utils/theme'
class CommentDetail extends Component{
  componentWillMount() {
    const {oldBookId} = this.props.commentdetail
    const {bookId} = this.props.navigation.state.params
    if(oldBookId !== bookId) {
      this.props.dispatch({
        type: 'commentdetail/update',
        payload: {
          comment: [],
          current: 1,
        }
      })
    }
  }
  componentDidMount() {
    this.fetchData()
  }
  headerRight = ()=> ( 
    <TouchableOpacity></TouchableOpacity>
  )
  renderItem = ({item})=> {
    return <Comment item={item} {...this.props}/>
  }
  update = (name, val)=> {
    this.props.dispatch({
      type: 'commentdetail/update',
      payload: {
        [name]: val
      }
    })
  }
  fetchData = (current, pageSize) => {
    this.props.dispatch({
      type: 'commentdetail/bookCatalog',
      payload: {
        current: current || 1,
        pageSize: pageSize || 10,
        book_uid: this.props.navigation.state.params.bookId 
      }
    })
  }
  renderFooter = () => {
    const {current, total} = this.props.commentdetail 
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
  fetchMore = ()=> {
    const {current, total, data, isLoading} = this.props.commentdetail
    if(isLoading || current >= total) {
      return
    }
    this.update('isLoading', true) 
    let currentPage = current + 1
    this.fetchData(currentPage)
  }
  render() {
    const {comment} = this.props.commentdetail
    const {title} = this.props.navigation.state.params 
    return(
      <View style={{flex: 1, backgroundColor: '#fff',}}>
        <Header title={title} right={this.headerRight} isClose={true} {...this.props}/>
        <View style={{ paddingTop: pxToDp(30), flex: 1}}>
          <FlatList  
            data={comment}
            renderItem={this.renderItem}
            keyExtractor={(item, index)=> index}
            style={{flex: 1, paddingLeft: pxToDp(30), paddingRight: pxToDp(30), paddingBottom: pxToDp(30),}}
            initialNumToRender={16}
            onEndReachedThreshold={0.3}
            onEndReached={this.fetchMore} 
            ListFooterComponent={this.renderFooter}
          />
        </View>
      </View>
    )
  }
}
const styles =StyleSheet.create({
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
})
const mapStateToProps = ({app, router, commentdetail})=> {
  return {app, router, commentdetail}
}
export default connect(mapStateToProps)(CommentDetail)