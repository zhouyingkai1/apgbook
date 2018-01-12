import * as rankServices from '../services/rankServices'
export default {
  namespace: 'bookshelf',
  state: {
    data: [],
    total: 1,
    current: 0,
    isRefreshing: true,
    type: 1,
    isLoading: true
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
    *queryCategoryBook({payload}, { call, put, select }) {
      const oldType = yield select(state=> state.bookshelf.type)
      let oldData = yield select(state=> state.bookshelf.data)
      if(oldType != payload.type) {
        oldData = []
      }
      let param = {categoryId: payload.categoryId, orderBy: payload.orderBy, pageNumber: payload.curren || 1, pageSize: 10, type: 1}
      const result = yield call(rankServices.queryCategoryBook, param)
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
    }
  },
}