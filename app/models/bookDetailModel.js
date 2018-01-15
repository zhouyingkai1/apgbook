import * as rankServices from '../services/rankServices'
export default {
  namespace: 'bookdetail',
  state: {
    data: [],
    visible: false
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload }
    },  
  },    
  effects: { 
    *getData({payload}, { call, put, select }) {
      const oldType = yield select(state=> state.bookshelf.type)
      let oldData = yield select(state=> state.bookshelf.data)
      if(oldType != payload.type) {
        oldData = []
      }
      let param = {type: payload.type, pageNumber: payload.current || 1, pageSize: 10}
      const result = yield call(rankServices.getData, param)
      if(result.code == '000') {
        yield put({
          type: 'update',
          payload: { 
            data: [...oldData, ...result.data.datas],
            total: result.data.totalPage,
            current: payload.current || 1,
            isRefreshing: false,
            isLoading: false
          }
        })
      }
    },
  },
}