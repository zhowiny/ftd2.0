import Vue from 'vue'
import App from './App'
import VueRoute from 'vue-router'
import Vuex from 'vuex'
import routers from './route/route-config'
import stores from './store/store-config'
// import mint from 'mint-ui'
import {$http, $POST} from './assets/js/axios'
import mixin from './mixin'
import md5 from 'blueimp-md5'

Vue.prototype.$http = $http
Vue.prototype.$POST = $POST
Vue.prototype.md5 = md5
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

// router.beforeEach((to, from, next) => {
//   if (!app.$store.state.isLogin && to.path !== '/') {
//     next('/')
//   } else {
//     next()
//   }
// })
