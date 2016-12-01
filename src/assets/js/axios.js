/**
 * Created by Administrator on 2016/11/17.
 */
/**
 * Created by Administrator on 2016/11/14.
 */
import ajax from 'axios'
// import config from '../../../config'
// const url = process.env.NODE_ENV === 'production' ? config.build.httpUrl : config.dev.httpUrl
// const url = 'http://192.168.1.72:8081'
const url = 'http://ifa.futongdai.com/FTD-APP'

const $http = ajax.create({
  method: 'post',
  baseURL: url,
  timeout: 10000,
  maxContentLength: 2000,
  withCredentials: true,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  transformRequest: [(data) => {
    let str = ''
    for (let key in data) {
      str += key + '=' + data[key] + '&'
    }
    return str.slice(0, -1)
  }]
})
export function $POST (u, d) {
  let promise = new Promise((resolve, reject) => {
    $http.post(u, d).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(err => {
      console.log(err)
    })
  })
  return promise
}
export default $http
