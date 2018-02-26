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
//修改密码
export function modifyPwd(data) {
  return request('/member/findBackPwd', {
    method: 'POST',
    body: data,
  })
}
//获取用户信息
export function getUserInfo(data) {
  return request('/member/userInfo', {
    method: 'POST',
    body: data,
  })
}