import request from '../utils/request'

//获取资源的详情
export function getBookData(data) {
  return request('/book/indexBook', {
    method: 'POST',
    body: data,
  })
}