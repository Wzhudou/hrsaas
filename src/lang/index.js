// 多语言实例文件
import VueI18n from 'vue-i18n'
import Vue from 'vue'
import Cookies from 'js-cookie' // 引入cookies的工具
import ElementUIZH from 'element-ui/lib/locale/lang/zh-CN' // 中文包
import ElementUIEN from 'element-ui/lib/locale/lang/en' // 英文包
import customZH from './zh' // 自定义中文
import customEN from './en' // 自定义英文

Vue.use(VueI18n)
export default new VueI18n({
  // i18n的选项
  // locale决定当前语言的类型，假设要切换多语言，只需要设置该属性就可以
  locale: Cookies.get('language') || 'zh', // 当前多语言的类型 =》 随意定义的字符串 中文(zh) 英文(en)
  messages: { // 当前的语言包
    zh: {
      // 语言包： elementUI的语言包 + 自定义语言包
      ...ElementUIZH,
      ...customZH
    },
    en: {
      ...ElementUIEN,
      ...customEN
    }
  }
})

// 自定义语言如何使用???
/**
    全局注册i18n，每个组件都会拥有一个 $t 的方法，会根据传入的key，寻找当前语言的文本

    $t() 可以穿入带点的字符串，表示查询嵌套结构的值
 */
