import { createAction, NavigationActions, Storage } from '../utils'
import * as authService from '../services/auth'
import * as commonService from '../services/commonServices'
export default {
  namespace: 'app',
  state: {
    login: false,
    loading: true,
    fetching: false,
    loginAlert: false,
    userInfo: {}
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
      const userInfo = yield call(Storage.get, 'userInfo', false)
      if(token&&uid) {
        yield put(createAction('updateState')({ login: true, userInfo }))
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
    *uploadImg({payload}, {call, put}) {
      let file = {uri: payload.file.uri, type: 'multipart/form-data', name: 'image.png'}
      let param = new FormData()
      param.append('image', file);
      param.append('type', 'times');
      const result = yield call(commonService.uploadImg, param)
      if(result.code == '000') {
        const userInfo = yield call(Storage.get, 'userInfo', false)
        userInfo.avatar = result.data.url
        yield put({
          type: 'updateState',
          payload: {
            userInfo
          }
        })
        Storage.set('userInfo', userInfo)
      }
    }
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' })
      // Storage.set('ts-token', 'd6b1c0e0b5bad3ce18f4b10aabefbc2a')
      // Storage.set('ts-uid', '365374576770')
    },
  },
}
