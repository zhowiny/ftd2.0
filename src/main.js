import Vue from 'vue'
import App from './App'
import VueRoute from 'vue-router'
import Vuex from 'vuex'
import routers from './route/route-config'
import stores from './store/store-config'
// import mint from 'mint-ui'
import {$http, $POST} from './assets/js/axios'
import mixin from './mixin'

Vue.prototype.$http = $http
Vue.prototype.$POST = $POST
Vue.use(VueRoute)
Vue.use(Vuex)
// Vue.use(mint)
Vue.mixin(mixin)

const router = new VueRoute(routers)
const store = new Vuex.Store(stores)

const app = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
}).$mount('#app')
app
