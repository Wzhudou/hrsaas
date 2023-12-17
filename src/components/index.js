// 负责所有全局自定义组件的注册
import ScreenFull from './ScreenFull'
import PageTools from './PageTools'
// 打印
import Print from 'vue-print-nb'
import ThemePicker from './ThemePicker'
import LangSelect from './lang'
// 主题颜色替换
export default {
  install(Vue) {
    // 组件注册
    Vue.component('PageTools', PageTools)
    Vue.component('ScreenFull', ScreenFull)
    Vue.use(Print) // 注册打印组件
    Vue.component('ThemePicker', ThemePicker)
    Vue.component('LangSelect', LangSelect)
  }
}

// 想用Vue.use注册组件 =》 会调用里面的install方法
