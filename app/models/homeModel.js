import * as homeServices from '../services/homeServices'
export default {
  namespace: 'home',
  state: {
    data: {}
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload }
    },
  },    
  effects: {
    *getBookData({payload}, { call, put }) {
      let param = {type: [1, 2, 3], number: [12, 10, 10]}
      const result = yield call(homeServices.getBookData, param)
      if(result.code == '000') {
        yield put({
          type: 'update',
          payload: {
            data: result.data
          }
        })
      }
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'getBookData' })
    },
  },
}
