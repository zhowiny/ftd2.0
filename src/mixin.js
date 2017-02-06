/**
 * Created by Administrator on 2016/11/23.
 */

export default {
  methods: {
    toPage (para) {
      if (typeof para === 'number') {
        this.$router.go(para)
      } else {
        this.$router.push(para)
      }
    },
    loginout (options) {
      let route = {path: '/'}
      this.$POST('/logout.json', {}).then(res => {
        if (parseInt(res.code) === 200) {
          typeof options === 'string' && (route.path = options)
          options && typeof options === 'object' && (route = options)
          this.$router.push(route)
          session()
        } else {
          this.toast(res.msg)
        }
        this.indicator.close()
      }).catch(err => {
        this.indicator.close()
        this.toast(err.toString())
      })
    }
  }
}
/**
 *
 * @param options 字符串为获取session,object为设置session
 */
export function session (options) {
  if (!options) {
    window.sessionStorage.clear()
    window.location.reload()
    return
  }
  if (typeof options === 'string') {
    return JSON.parse(window.sessionStorage.getItem(options))
  } else if (typeof options === 'object') {
    for (var key in options) {
      window.sessionStorage.setItem(key, JSON.stringify(options[key]))
    }
  } else {
    throw new Error('参数类型不正确!')
  }
}
