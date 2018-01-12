import * as rankServices from '../services/rankServices'
export default {
  namespace: 'bookshelf',
  state: {
    data: [],
    total: 1,
    current: 0,
    isRefreshing: true,
    type: 1,
    isLoading: true,
    categoryId: '',
    orderType: 1,
    orderBy: 0
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
      const oldCategoryId = yield select(state=> state.bookshelf.categoryId)
      const orderBy = yield select(state=> state.bookshelf.orderBy)
      const orderType = yield select(state=> state.bookshelf.orderType)
      let oldData = yield select(state=> state.bookshelf.data)
      let param = {categoryId: payload.categoryId == 1? '': payload.categoryId, orderBy: orderBy || 0, pageNumber: payload.current || 1, pageSize: 10, type: orderType || 1}
      const result = yield call(rankServices.queryCategoryBook, param)
      if(oldCategoryId != payload.categoryId || payload.current == 1) {
        oldData = []
      }
      yield put({
        type: 'update',
        payload: { 
          data: [...oldData, ...result.datas],
          total: result.totalPage,
          current: payload.current || 1,
          isRefreshing: false,
          isLoading: false
        }
      })
    }
  },
}