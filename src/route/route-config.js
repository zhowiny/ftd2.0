/**
 * Created by Administrator on 2016/11/17.
 */
// const hello = resolve => require(['../components/bits.vue'], resolve)
// const test = resolve => require(['../components/test.vue'], resolve)
// const test = require('../components/test.vue')
// const bits = require('../components/bits.vue')
// const index = require('../components/index.vue')

import config from './config.json'
const registerRoute = config => {
  let route = []
  config.map(page => {
    route.push({
      path: page.path,
      component: require(`./../components${page.component}`)
    })
  })
  return route
}

const routes = registerRoute(config)

export default {routes}
