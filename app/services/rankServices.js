import request from '../utils/request'

//获取对应type的列表
export function getData(data) {
  return request('/rank/rankList', {
    method: 'POST',
    body: data,
  })
}

//获取对应分类的列表
export function queryCategoryBook(data) {
  return request('/book/queryCategoryBook', {
    method: 'POST',
    body: data,
  })
}