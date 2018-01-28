import React, { Component } from 'react'
import {View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native'
import {Comment, Header, Loading, TextButton} from '../components'
import {connect} from 'react-redux'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import pxToDp from '../utils/pxToDp'
import theme from '../utils/theme'
import KeyboardSpacer from 'react-native-keyboard-spacer'
class CommentDetail extends Component{
  componentWillMount() {
    const {bookId: oldBookId} = this.props.commentdetail
    const {bookId} = this.props.navigation.state.params
    if(oldBookId !== bookId) {
      this.props.dispatch({
        type: 'commentdetail/update',
        payload: {
          comment: [],
          current: 1,
          bookId
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
    const {showAllList, showAll} = this.props.commentdetail
    return <Comment replyComment={this.replyComment} update={this.update} showAllList={showAllList} deleteComment={this.deleteComment} handlePraise={this.handlePraise} item={item} {...this.props}/>
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
  //点赞 取消点赞
  handlePraise = (type, commentId)=> {
    // type == 1 未点赞
    this.props.dispatch({
      type: 'commentdetail/handleBookLike',
      payload: {
        comment_id: commentId,
        type
      }
    })
  }
  //删除评论
  deleteComment = (id)=> {
    this.props.dispatch({
      type: 'commentdetail/deleteComment',
      payload: {
        comment_id: id
      }
    })
  }
  // 用户提交评论
  submitComment = ()=> {
    const {bookId, commentVal, replyInfo} = this.props.commentdetail
    this.props.dispatch({
      type:'commentdetail/submitComment', 
      payload: {
        bookId,
        content: commentVal,
        replyInfo
      }
    })
    this.refs.input.blur()
  }
  // 回复评论
  replyComment = (info)=> {
    this.update('replyInfo', info)
    this.refs.input.focus()
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
  // 保存评论内容
  updateCommentVal = value=> this.update('commentVal', value)
  render() {
    const {comment, replyInfo, commentVal} = this.props.commentdetail
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
          <View style={styles.commentInput}>
            <TextInput onBlur={()=> this.update('replyInfo', {})} ref='input'
              placeholder={replyInfo.name?`回复${replyInfo.name}:`:'说说你的想法'} 
              value={commentVal}  
              onChangeText={(value)=> this.updateCommentVal(value)} style={styles.input} 
              blurOnSubmit={true}/>
            <TextButton onPress={()=> this.submitComment()} text='发表'/>
          </View>
        </View>
        <KeyboardSpacer/>
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
  commentInput: {
    height: pxToDp(92),
    paddingBottom: pxToDp(20),
    paddingRight: pxToDp(20),
    paddingTop: pxToDp(20),
    paddingLeft: pxToDp(20),
    backgroundColor: '#fff',
    borderTopWidth: pxToDp(1),
    borderColor: '#c7c7c7',
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height: pxToDp(44)
  }
})
const mapStateToProps = ({app, router, commentdetail})=> {
  return {app, router, commentdetail}
}
export default connect(mapStateToProps)(CommentDetail)