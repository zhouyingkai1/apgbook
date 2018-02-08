import * as loginServices from '../services/loginServices'
import { NavigationActions, Storage } from '../utils'
import Toast from 'react-native-root-toast'
import { Base64 } from 'js-base64';
export default {
  namespace: 'login',
  state: {
    isYzm: false,
    timeNumber: 0,
    phone: '',
    pwd: '',
    isLogin: true,
    isChangePwd: false
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload }
    },  
  },    
  effects: { 
    *getCode({payload}, {select, call, put}) {
      const param = {mobile: payload.phone, type: "1"}
      const result = yield call(loginServices.sendCode, param)
      if(result.code == '000') {
        Toast.show('发送成功，请注意查收')
      }
    },
    *login({payload}, {select, call, put}) {
      let type = 'password'
      if(payload.isYzm) {
        type = 'phoneCode'
      }
      const param = {mobile: payload.phone, [type]: payload.pwd}
      if(!payload.isYzm) {
        param[type] = Base64.encode(payload.pwd)
      }
      const result = yield call(loginServices.login, param)
      if(result.code == '000') {
        Storage.set('ts-token', result.data.token)
        Storage.set('ts-uid', result.data.uid)
        yield put({
          type: 'app/updateState',
          payload: {
            login: true,
          }
        })
        yield put(NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Main' })],
        }))
        Toast.show('登录成功')
      }else{
        if(payload.isYzm){
          Toast.show('验证码错误')
        }else{
          Toast.show('账号或密码错误')
        }
      }
    },
  },
}
