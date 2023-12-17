import router from './router'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'
import store from './store'
import { asyncRouter } from '@/router'
// 白名单
const whiteList = ['/login', '/404']
// 前置守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // to 到哪里去 from 从哪里来 next() 通过
  const token = store.getters.token
  // 是否有token
  if (token) {
    // 存在token =》 是否登录页
    if (to.path === '/login') {
      // 是登录页 =》主页
      next('/')
      // 当next(地址)并没有执行后置守卫
      NProgress.done()
    } else {
      // 判断是否获取过资料
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('user/getUserInfo')
        // console.log('rrrr', roles.menus, asyncRouter)
        await store.dispatch('permission/filterRoutes', roles.menus)
        // 筛选出有权限的路由
        const filterRoutes = asyncRouter.filter(item => roles.menus.includes(item.name))
        store.commit('user/setRoutes', filterRoutes)
        router.addRoutes([...filterRoutes, { path: '*', redirect: '/404', hidden: true }]) // 添加动态路由信息到路由表
        // router添加动态路由后，需要转发一下
        next(to.path) // 目的是让路由拥有信息 =》router的已知缺陷
      } else {
        // 否登录页 =》 放行
        next()
      }
    }
  } else {
    // 没有token => 是否白名单
    if (whiteList.includes(to.path)) {
      // 是白名单 => 放行
      next()
    } else {
      // 否 =》 登录页
      next('/login')
      NProgress.done()
    }
    // next()
  }
})

// 后置守卫
router.afterEach(() => {
  NProgress.done()
})
// import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

// // 路由前置后卫
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

// // 路由后置守卫
// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
