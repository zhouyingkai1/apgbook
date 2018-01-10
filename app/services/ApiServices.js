import request from '../utils/request'

//获取资源的详情
export function getCoursewareDetail(data) {
  return request('/api/course/list', {
    method: 'POST',
    body: data,
  })
}