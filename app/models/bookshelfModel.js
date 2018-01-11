import * as rankServices from '../services/rankServices'
export default {
  namespace: 'bookshelf',
  state: {
    data: [],
    total: 1,
    current: 1,
    isRefreshing: false
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload }
    },  
  },    
  effects: { 
    *getData({payload}, { call, put, select }) {
      let param = {type: payload.type, pageNumber: payload.current || 1, pageSize: 10}
      const result = yield call(rankServices.getData, param)
      if(result.code == '000') {
        const oldData = yield select(state=> state.bookshelf.data)
        console.log(oldData,'oldData')
        yield put({
          type: 'update',
          payload: { 
            data: [...oldData, ...result.data.datas],
            total: result.data.totalPage,
            current: payload.current || 1
          }
        })
      }
    },
  },
}
