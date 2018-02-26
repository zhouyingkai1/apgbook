import * as pressServices from '../services/pressServices'
import { Storage } from '../utils'
export default {
  namespace: 'pressdetail',
  state: {
    hot: [],
    newBook: []
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload }
    },  
  },    
  effects: { 
    *getLastBook({payload}, {call, put, select}){
      const result = yield call(pressServices.latestBooks, {pageNumber: 1, pageSize: 10, pressId: payload.pressId})
      if(result.code == '000') {
        yield put({
          type: 'update',
          payload: {
            newBook: result.data.datas
          }
        })
      }
    },
    *getHotBook({payload}, {call, put, select}){
      const result = yield call(pressServices.hotRecommend, {pageNumber: 1, pageSize: 10, pressId: payload.pressId})
      if(result.code == '000') {
        yield put({
          type: 'update',
          payload: {
            hot: result.data.datas
          }
        })
      }
    },
  }
}
