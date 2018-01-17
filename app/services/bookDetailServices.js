import request from '../utils/request'

//获取书详情
export function getBookInfo(data) {
  return request('/book/bookInfo', {
    method: 'POST',
    body: data,
  })
}
//获取此书相类似的书列表
export function hotBook(data) {
  return request('/book/indexBook', {
    method: 'POST',
    body: data,
  })
}
//获取评论列表
export function bookCatalog(data) {
  return request('/book/bookCatalog', {
    method: 'POST',
    body: data,
  })
}
//收藏 
export function collectBook(data) {
  return request('/collect/collectBook', {
    method: 'POST',
    body: data,
  })
}
// 取消收藏
export function cancelCollectBook(data) {
  return request('/collect/cancelCollectBook', {
    method: 'POST',
    body: data,
  })
}
//获取菜单列表
export function getMenu(data) {
  return request('/book/getMenu', {
    method: 'POST',
    body: data,
  })
}
