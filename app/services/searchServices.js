import request from '../utils/request'

//获取对应type的列表
export function searchData(data) {
  return request('/book/searchBook', {
    method: 'POST',
    body: data,
  })
}
