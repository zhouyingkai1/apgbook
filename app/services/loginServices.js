import request from '../utils/request'

//短信验证码接口
export function sendCode(data) {
  return request('/member/sendCode', {
    method: 'POST',
    body: data,
  })
}

//登录
export function login(data) {
  return request('/member/login', {
    method: 'POST',
    body: data,
  })
}