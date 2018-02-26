
import request from '../utils/request'

//上传
export function uploadImg(data) {
  return request('http://www.timeface.cn/tf/common/uploadimg', {
    method: 'POST',
    body: data,
  })
}