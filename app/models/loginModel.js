import * as homeServices from '../services/homeServices'
import { Storage } from '../utils'
export default {
  namespace: 'login',
  state: {
    isYzm: false,
    timeNumber: 0
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload }
    },  
  },    
  effects: { 
    
  },
}
