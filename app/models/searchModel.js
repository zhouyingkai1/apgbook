import * as searchServices from '../services/searchServices'
export default {
  namespace: 'search',
  state: {
    keyword: '',
    data: [],
    total: 2,
    page: 1,
    isSearch: false,
    isRefreshing: true,
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload }
    },  
  },    
  effects: { 
    *searchData({payload}, { call, put, select }) {
      const oldData = yield select(state=> state.search.data)
      const canFetchMore = yield select(state=> state.search.canFetchMore)
      var old = oldData
      if(payload.pageNumber == 1){
        old = []
      }
      yield put({
        type: 'update',
        payload: {
          isRefreshing: true,
        }
      })
      const result = yield call(searchServices.searchData, payload)
      if(result.code == '000') {
        yield put({
          type: 'update',
          payload: { 
            data: [...old, ...result.data.datas],
            total: result.data.totalPage,
            page: result.data.pageNumber,
            isSearch: true,
            isRefreshing: false
          }
        })
      }
    },
  },
}
