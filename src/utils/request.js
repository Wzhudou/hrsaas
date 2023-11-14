import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

// 创建一个新的axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础地址 ===> 见.env.development和.env.production
  timeout: 10000
})

// 请求拦截器
// 成功执行第一个，失败执行第二个
service.interceptors.request.use(config => {
  // 注入token
  const token = store.getters.token // 放到请求头
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  // 失败执行Promise
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  // 默认包裹了data
  const { data, message, success } = response.data
  if (success) {
    return data
  }
  Message({ type: 'error', message })
  return Promise.reject(new Error(message))
}, async error => {
  // error 里面有个message
  if (error.response.status === 401) {
    Message({
      type: 'warning',
      message: 'token超时了'
    })
    // 说明token超时了
    await store.dispatch('user/logout') // 调用action 退出登录
    // 跳转到登录页
    router.push('/login')
    return Promise.reject(error)
  }
  Message({
    type: 'error',
    message: error.message
  })
  return Promise.reject(error)
})

export default service
