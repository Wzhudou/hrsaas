import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import echarts from './libs/echarts'

import Components from '@/components' // 全局注册组件

// 多语言
import i18n from '@/lang'

// 挂载到vue实例中
Vue.prototype.$echarts = echarts

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// 中英文替换相关
Vue.use(ElementUI, {
  // element 本身支持i18n处理
  // 此时i18n会根据当前的（见src/lang里的locale）locale属性寻找对应的显示内容
  i18n: (key, value) => i18n.t(key) // t方法 =》回去对应的语言包里寻找对应的内容
  // 改变locale的值，就可以改变当前的语言
})

Vue.use(Components) // 注册全局组件

Vue.config.productionTip = false

// 自定义指定的全局注册
import * as directives from '@/directives'
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

// // 注册过滤器
import * as filters from '@/filters' // 引入工具类
// // 注册全局的过滤器
Object.keys(filters).forEach(key => {
  // 注册过滤器
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
