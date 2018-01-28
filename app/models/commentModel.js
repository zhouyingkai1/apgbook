import * as bookDetailServices from '../services/bookDetailServices'
import { Storage } from '../utils'
import Toast from 'react-native-root-toast'
import pxToDp from '../utils/pxToDp'
export default {
  namespace: 'commentdetail',
  state: {
    comment: [],  //评论列表
    total: 2,
    current: 1,
    isLoading: true,
    bookId: '',
    showAllList: [],  //展示所有评论的id 列表
    replyInfo: {}
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload }
    },   
  },      
  effects: { 
    *bookCatalog({payload}, { call, put, select }) {
      const param = {book_uid: payload.book_uid, pageNumber: payload.current || 1, pageSize: payload.pageSize || 10}
      const result = yield call(bookDetailServices.bookCatalog, param)
      let oldComment = yield select(state=> state.commentdetail.comment)
      if(result) {
        if(result.pageNumber == 1 ){
          oldComment = []
        }
        yield put({
          type: 'update',
          payload: { 
            comment: [...oldComment, ...result.datas],
            total: result.totalPage,
            isLoading: false,
            current: result.pageNumber
          }
        })
      }
    },
    *submitComment({payload}, {call, put, select}) {
      const {replyInfo} = payload
      const param = {book_uid: payload.bookId, content: payload.content, replyId: payload.replyId || 0, h5: 1}
      if(replyInfo.parentId) {
        param.replyId = replyInfo.parentId
        param.first_parent_id = replyInfo.parentId
      }
      const result = yield call(bookDetailServices.submitComment, param)
      if(result.code == '000') {
        //commentNum
        Toast.show('评论成功', {position: pxToDp(650)})
        
        let comment = yield select(state=> state.commentdetail.comment)
        let newTotal = yield select(state=> state.commentdetail.total)    
        if(replyInfo.parentId){
          comment = comment.filter(item=> {
            if(item.id == replyInfo.parentId){
              item.replys.push(result.data)
            }     
            return item
          })
        }else{ 
          comment.unshift(result.data)
          if(comment.length>10) {
            comment.pop()
            newTotal = newTotal + 1
          }
        }
        yield put({
          type: 'update',
          payload: {
            commentVal: '',
            comment: comment,
            total: newTotal
          }
        })
      }
    },
    *handleBookLike({payload}, { call, put, select }) {
      const result = yield call(bookDetailServices.bookLike, payload)
      if(result.code == '000') {
        const comment = yield select(state=> state.commentdetail.comment)
        const newComment = comment.filter(item=> {
          if(item.id == payload.comment_id){
            item.islike = Number(!payload.type)
            if(payload.type) {
              ++item.likeNum
            }else{
              --item.likeNum
            }
          }
          return item
        })
        yield put({
          type: 'update',
          payload: { 
            comment: newComment
          }
        })
      }
    },
    *deleteComment({payload}, {call, put, select}) {
      const result = yield call(bookDetailServices.deleteComment, payload)
      if(result.code == '000') {
        //commentNum
        Toast.show('删除成功', {position: pxToDp(650)})
        const comment = yield select(state=> state.commentdetail.comment)
        const newComment = comment.filter(item=> item.id != payload.comment_id)
        yield put({
          type: 'update',
          payload: {
            comment: newComment
          }
        })
      }
    }
  },
}