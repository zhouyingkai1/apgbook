import * as rankServices from '../services/rankServices'
export default {
  namespace: 'rank',
  state: {
    data1: [],
    data2: [],
    data3: [],
    data4: [],
    data5: [],
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload }
    },  
  },    
  effects: { 
    *getData({payload}, { call, put }) {
      let param = {type: payload.type, pageNumber: 1, pageSize: 10}
      const result = yield call(rankServices.getData, param)
      if(result.code == '000') {
        yield put({
          type: 'update',
          payload: { 
            ['data' + payload.type]: result.data.datas
          }
        })
      }
    },
  },
}
