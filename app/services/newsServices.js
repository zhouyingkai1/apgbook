import request from '../utils/request'

// 获取消息列表 
export function getMessage(data) {
  return request('/message/getMessage', {
    method: 'POST',
    body: data,
  })
}
// 获取收藏列表 
export function getBook(data) {
  return request('/collect/myCollection', {
    method: 'POST',
    body: data,
  })
}
