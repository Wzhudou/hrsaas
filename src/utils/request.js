import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeSatmp } from '@/utils/auth'
const service = axios.create({
  // 当执行npm run dev => .env.development => /api => 跨域代理
  // 当执行npm run dev => .env.production => /prod_api
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 设置超时时间
})
const timeOut = 3600 // 超时时间，接口
// 判断是否超时  当前事件 - 缓存时间 > timeOut ? 超时 : 没有超时
function checkTimeOut() {
  const currentTime = Date.now() // 当前时间戳
  const timeStamp = getTimeSatmp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > timeOut
}
// 请求拦截 config请求的配置信息
service.interceptors.request.use(config => {
  // 注入token
  if (store.getters.token) {
    // 只有在有token的情况下，才有必要检查时间戳是否超时
    if (checkTimeOut()) {
      // 为 true 超时 =》 跳转登录页面，清除token =》 跳到登录页
      store.dispatch('user/logout') // 登出操作
      router.push({
        path: '/login'
      })
      return Promise.reject(new Error('token 超时'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须要有返回的
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(response => {
  // axios返回的数据默认加了一层data，这里做了处理
  const { success, message, data } = response.data
  // 要根据success决定后面的操作
  if (success) {
    return data
  }
  Message.error(message) // 提示错误信息
  return Promise.reject(new Error(message)) // 错误对象
}, error => {
  // error信息里面response对象
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 10002 =》表示后端告诉token失效
    store.dispatch('user/logout')
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误信息
  }
  return Promise.reject(error) // 返回执行错误， 让当前的执行链跳出， 直接进入catch
})
export default service

// import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// // create an axios instance
// const service = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
//   // withCredentials: true, // send cookies when cross-domain requests
//   timeout: 5000 // request timeout
// })

// // request interceptor
// service.interceptors.request.use(
//   config => {
//     // do something before request is sent

//     if (store.getters.token) {
//       // let each request carry token
//       // ['X-Token'] is a custom headers key
//       // please modify it according to the actual situation
//       config.headers['X-Token'] = getToken()
//     }
//     return config
//   },
//   error => {
//     // do something with request error
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )

// // response interceptor
// service.interceptors.response.use(
//   /**
//    * If you want to get http information such as headers or status
//    * Please return  response => response
//   */

//   /**
//    * Determine the request status by custom code
//    * Here is just an example
//    * You can also judge the status by HTTP Status Code
//    */
//   response => {
//     const res = response.data

//     // if the custom code is not 20000, it is judged as an error.
//     if (res.code !== 20000) {
//       Message({
//         message: res.message || 'Error',
//         type: 'error',
//         duration: 5 * 1000
//       })

//       // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         // to re-login
//         MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
//           confirmButtonText: 'Re-Login',
//           cancelButtonText: 'Cancel',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('user/resetToken').then(() => {
//             location.reload()
//           })
//         })
//       }
//       return Promise.reject(new Error(res.message || 'Error'))
//     } else {
//       return res
//     }
//   },
//   error => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

// export default service
