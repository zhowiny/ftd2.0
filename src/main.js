import Vue from 'vue'
import App from './App'
import VueRoute from 'vue-router'
import Vuex from 'vuex'
import routers, {path} from './route/route-config'
import stores from './store/store-config'
import $http, {$POST} from './assets/js/axios'
import mixin, {session} from './mixin'
import md5 from 'blueimp-md5'
import {Toast} from 'mint-ui'

Vue.prototype.$http = $http
Vue.prototype.$POST = $POST
Vue.prototype.md5 = md5
Vue.prototype.session = session
// Vue.prototype.indicator = Indicator
Vue.prototype.toast = Toast
Vue.use(VueRoute)
Vue.use(Vuex)
// Vue.use(mint)
Vue.mixin(mixin)
const router = new VueRoute(routers)
const store = new Vuex.Store(stores)
const app = new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
app
router.afterEach(route => {
  document.body.scrollTop = 0
})
path
router.beforeEach((to, from, next) => {
  // 未登录可以进入忘记密码页面
  if (~path.indexOf(to.path.slice(1).split('/')[0]) && !session('isLogin') && to.path !== '/set/password/change/0/1') {
    router.push({path: '/login'})
  } else {
    next()
  }
})
