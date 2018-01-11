import request from '../utils/request'

//获取资源的详情
export function getData(data) {
  return request('/rank/rankList', {
    method: 'POST',
    body: data,
  })
}