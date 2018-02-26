import request from '../utils/request'

// 获取消息列表 
export function getPressList(data) {
  return request('/press/joinPressInfo', {
    method: 'POST',
    body: data,
  })
}
// 获取最热列表 
export function hotRecommend(data) {
  return request('/press/hotRecommend', {
    method: 'POST',
    body: data,
  })
}
// 获取最新列表 
export function latestBooks(data) {
  return request('/press/latestBooks', {
    method: 'POST',
    body: data,
  })
}