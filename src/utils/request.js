import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

// 创建一个新的axios实例
const service = axios.create({
  baseURL: '/api', // 基础地址
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
  return Promise.reject(new Error(message))
}, error => {
  // error 里面有个message
  Message({
    type: 'error',
    message: error.message
  })
  return Promise.reject(error)
})

export default service
