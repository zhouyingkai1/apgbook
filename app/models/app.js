import { createAction, NavigationActions, Storage } from '../utils'
import * as authService from '../services/auth'
export default {
  namespace: 'app',
  state: {
    login: false,
    loading: true,
    fetching: false,
    loginAlert: false
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },    
  effects: {
    *loadStorage(action, { call, put }) {
      const token = yield call(Storage.get, 'ts-token', false)
      const uid = yield call(Storage.get, 'ts-uid', false)
      if(token&&uid) {
        yield put(createAction('updateState')({ login: true }))
      }else{
        yield put(createAction('updateState')({ login: false }))
      }
    },
    *login({ payload }, { call, put }) {
      yield put(createAction('updateState')({ fetching: true }))
      const login = yield call(authService.login, payload)
      if (login) {
        
      }
      yield put(createAction('updateState')({ login, fetching: false }))
      Storage.set('login', login)
    },
    *logout(action, { call, put }) {
      yield call(Storage.set, 'login', false)
      yield put(createAction('updateState')({ login: false }))
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' })
      // Storage.set('ts-token', 'd6b1c0e0b5bad3ce18f4b10aabefbc2a')
      // Storage.set('ts-uid', '365374576770')
    },
  },
}
