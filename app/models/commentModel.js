import * as bookDetailServices from '../services/bookDetailServices'
import { Storage } from '../utils'
import Toast from 'react-native-root-toast'
export default {
  namespace: 'commentdetail',
  state: {
    comment: [],  //评论列表
    total: 1,
    current: 2,
    isLoading: false,
    bookId: ''
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
    }
  },
}