/**
 * Created by Administrator on 2016/11/17.
 */

import config from './config.json'
const registerRoute = config => {
  let route = []
  config.map(page => {
    route.push({
      path: page.path,
      component: require(`./../components${page.component}`),
      name: page.name || ''
    })
  })
  return route
}

const routes = registerRoute(config)

export default {routes}
