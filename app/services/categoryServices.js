import request from '../utils/request'

//获取资源的详情
export function getCategory(data) {
  return request('/category/getCategoryInfo', {
    method: 'POST',
    body: data,
  })
}