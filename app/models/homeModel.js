import * as homeServices from '../services/homeServices'
import { Storage } from '../utils'
export default {
  namespace: 'home',
  state: {
    data: {},
    isRefreshing: false
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload }
    },  
  },    
  effects: { 
    *loadData({}, {call, put}){
      const homeData = yield call(Storage.get, 'homeData', false)
      if(!homeData) {
        yield put({ type: 'getBookData' })
      }else{
        yield put({   
          type: 'update', 
          payload: { 
            data: homeData
          }
        }) 
      }
    },
    *getBookData({payload}, { call, put }) {
      let param = {type: [1, 2, 3], number: [12, 10, 10]}
      const result = yield call(homeServices.getBookData, param)
      if(result.code == '000') {
        yield put({
          type: 'update',
          payload: { 
            isRefreshing: false,
            data: result.data
          }
        })
        Storage.set('homeData', result.data)
      }
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadData' })
    },
  },
}
