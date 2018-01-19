import * as bookDetailServices from '../services/bookDetailServices'
import { Storage } from '../utils'
import Toast from 'react-native-root-toast'
import pxToDp from '../utils/pxToDp'
export default {
  namespace: 'bookdetail',
  state: {
    bookInfo: {},
    comment: [],  //评论列表
    visible: false,
    bookId: '',
    tab: 0,
    hotBook: [],
    hotBookIndex: 0,
    isRefreshing: false,
    menu: [],
    commentVal: '', //评论内容
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload }
    },  
  },    
  effects: { 
    *getBookInfo({payload}, { call, put }) {
      const result = yield call(bookDetailServices.getBookInfo, payload)
      if(result.code == '000') {
        yield put({
          type: 'update',
          payload: { 
            bookInfo: result.data,
            isRefreshing: false
          }
        })
        Storage.set(`bookInfo${payload.bookId}`, result.data)
      }
    },
    *getHotBook({payload}, { call, put }) {
      const result = yield call(bookDetailServices.hotBook, payload)
      if(result.code == '000') {
        yield put({
          type: 'update',
          payload: { 
            hotBook: result.data.type1
          }
        })
        Storage.set(`hotBook`, result.data.type1)
      }
    },
    *getBookMenu({payload}, { call, put }) {
      const result = yield call(bookDetailServices.getMenu, payload)
      if(result.code == '000') {
        yield put({
          type: 'update',
          payload: { 
            menu: result.data
          }
        })
      }
    },
    *bookCatalog({payload}, { call, put }) {
      const param = {book_uid: payload.bookId, pageNumber: payload.currentPage, pageSize: payload.pageSize || 10}
      const result = yield call(bookDetailServices.bookCatalog, param)
      if(result) {
        yield put({
          type: 'update',
          payload: { 
            comment: result.datas
          }
        })
      }
    },
    *hanldeCollect({payload}, { call, put }) {
      let {bookInfo} = payload
      let result
      if(!!bookInfo.isCollect) {
        result = yield call(bookDetailServices.cancelCollectBook, {bookId: bookInfo.bookId})
      }else{
        result = yield call(bookDetailServices.collectBook, {bookId: bookInfo.bookId})
      }
      bookInfo.isCollect = !bookInfo.isCollect
      if(result.code == '000') {
        Toast.show('操作成功', {position: pxToDp(650)})
        yield put({
          type: 'update',
          payload: { 
            bookInfo: bookInfo
          }
        })
        Storage.set(`bookInfo(${bookInfo.bookId})`, bookInfo)
      }
    },

  },
}