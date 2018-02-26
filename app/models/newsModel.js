import * as newsServices from '../services/newsServices'
import { Storage } from '../utils'
export default {
  namespace: 'news',
  state: {
    data: [],
    isRefreshing: false,
    total: 2,
    page: 1,
    bookData: [],
    bookIsRefreshing: false,
    bookTotal: 2,
    bookPage: 1,
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload }
    },  
  },    
  effects: { 
    *getNews({payload = {}}, {call, put, select}){
      const param = {pageNumber: payload.page || 1, pageSize: payload.pageSize || 15}
      const result = yield call(newsServices.getMessage, param)
      if(result.code == '000') {
        const {data} = result
        let oldData = yield select(state=> state.news.data)
        if(data.pageNumber == 1){
          oldData = []
        }
        yield put({
          type: 'update',
          payload: {
            data: [...oldData, ...data.datas],
            total: data.totalPage,
            page: data.pageNumber,
            isRefreshing: false
          }
        })
      }
    },
    *getBook({payload = {}}, {call, put, select}){
      const memberUid = Storage.get('ts-uid')
      const param = {memberUid, pageNumber: payload.page || 1, pageSize: payload.pageSize || 10}
      const result = yield call(newsServices.getBook, param)
      if(result.code == '000') {
        const {data} = result
        let oldData = yield select(state=> state.news.bookData)
        if(data.pageNumber == 1){
          oldData = []
        }
        yield put({
          type: 'update',
          payload: {
            bookData: [...oldData, ...data.datas],
            bookTotal: data.totalPage,
            bookPage: data.pageNumber,
            bookIsRefreshing: false
          }
        })
      }
    },
  }
}
