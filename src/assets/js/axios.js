/**
 * Created by Administrator on 2016/11/17.
 */
/**
 * Created by Administrator on 2016/11/14.
 */
import ajax from 'axios'
import {Indicator, Toast} from 'mint-ui'
import config from '../../../config'
const url = process.env.NODE_ENV === 'production' ? config.build.httpUrl : config.dev.httpUrl
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
  if (this.session('date') && Date.now() > (this.session('date') + 1000 * 60 * 30)) {
    window.sessionStorage.clear()
    // 30分钟无交互清空sessiong并跳到首页
    setTimeout(() => {
      window.location.href = window.location.origin + window.location.pathname
    }, 2e3)
    return Promise.reject('长时间未操作!登录信息已失效!')
  }
  let promise = new Promise((resolve, reject) => {
    Indicator.open()
    $http.post(u, d).then(res => {
      if (res.status === 200) {
        window.sessionStorage.setItem('date', Date.now())
        if (~~res.data.code === 100) {
          // 如果MD5str错误则重新加载页面
          Toast({
            message: '未知错误!请重试!',
            duration: 2000
          })
          setTimeout(() => {
            window.sessionStorage.clear()
            window.location.reload()
            reject(res.data)
          }, 2e3)
        } else {
          resolve(res.data)
        }
      } else {
        reject(res.data)
      }
      Indicator.close()
    }).catch(err => {
      reject(err)
      Indicator.close()
    })
  })
  return promise
}
export default $http
