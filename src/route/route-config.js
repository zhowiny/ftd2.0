/**
 * Created by Administrator on 2016/11/17.
 */
import config from './config.json'
let checkPath = []
const registerRoute = config => {
  let route = []
  config.map(page => {
    route.push({
      path: page.path,
      component: require(`./../components${page.component}`),
      name: page.name || ''
    })
    if (~page.component.indexOf('/mine') || ~page.component.indexOf('/account') || ~page.component.indexOf('/invite') || ~page.component.indexOf('/bitDetail')) {
      checkPath.push(page.path.slice(1).split('/')[0])
    }
  })
  return route
}
const routes = registerRoute(config)
export var path = [...new Set(checkPath)]
export default {routes}
