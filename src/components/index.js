// 负责所有全局自定义组件的注册
import ScreenFull from './ScreenFull'
import PageTools from './PageTools'

export default {
  install(Vue) {
    // 组件注册
    Vue.component('PageTools', PageTools)
    Vue.component('ScreenFull', ScreenFull)
  }
}

// 想用Vue.use注册组件 =》 会调用里面的install方法
