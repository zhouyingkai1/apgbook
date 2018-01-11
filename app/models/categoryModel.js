import * as categoryServices from '../services/categoryServices'
export default {
  namespace: 'category',
  state: {
    data: [],
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload }
    },  
  },    
  effects: { 
    *getCategory({payload}, { call, put }) {
      const result = yield call(categoryServices.getCategory, {})
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
}
