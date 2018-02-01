import * as searchServices from '../services/searchServices'
export default {
  namespace: 'search',
  state: {
    keyword: '',
    data: [],
    total: 2,
    page: 1,
    isSearch: false
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload }
    },  
  },    
  effects: { 
    *searchData({payload}, { call, put }) {
      const result = yield call(searchServices.searchData, payload)
      if(result.code == '000') {
        yield put({
          type: 'update',
          payload: { 
            data: result.data.datas,
            total: result.data.totalPage,
            page: result.data.pageNumber,
            isSearch: true
          }
        })
      }
    },
  },
}
