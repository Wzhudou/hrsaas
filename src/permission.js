// 权限拦截在路由跳转 导航守卫
import router from './router'
import store from './store'
// 进度条
import NProgress from 'nprogress' // progress bar 进度条
import 'nprogress/nprogress.css' // progress bar style // 进度条样式
// 前置守卫
// next是前置守卫必须执行的钩子
// next() 放过
// next(false) // 跳转终止
// next(地址) 跳转到某个地址
const whiteList = ['/login', '/404'] // 定义白名单，所有不受权限控制的页面
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开启进度条
  if (store.getters.token) {
    // 只有有token的情况下 才能获取资料
    // 是否登录页面
    if (to.path === '/login') {
      // 登录页面
      next('/') // 跳到主页
    } else {
      // 只有放过的时候才能获取用户资料，但不能每次都执行
      // 如果当前vuex中有用户资料的id，表示已经获取，不许获取
      if (!store.getters.userId) {
        // 如果没有id，需要请求接口获取
        await store.dispatch('user/getUserInfo')
        // 如果说需要根据用户资料获取数据，这里必须改成同步
      }
      next() // 放行
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      // 要去的地址在白名单里，直接放行
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done() // 关闭进度条 --- 解决手动切换地址时，进度条不关闭问题
})
// 后置守卫
router.afterEach(() => {
  NProgress.done() // 关闭进度条
})
// import store from './store'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // set page title
//   document.title = getPageTitle(to.meta.title)

//   // determine whether the user has logged in
//   const hasToken = getToken()

//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
