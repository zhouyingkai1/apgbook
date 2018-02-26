import * as pressServices from '../services/pressServices'
import { Storage } from '../utils'
export default {
  namespace: 'press',
  state: {
    data: [],
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload }
    },  
  },    
  effects: { 
    *getPressList({}, {call, put, select}){
      const result = yield call(pressServices.getPressList, {pageNumber: 1, pageSize: 10})
      if(result.code == '000') {
        yield put({
          type: 'update',
          payload: {
            data: result.data.datas
          }
        })
      }
    },
  }
}
