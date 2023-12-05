import { getToken, setToken, removeToken } from '@/utils/auth' //
import { login, getUserInfo } from '@/api/user'
import { constantRoutes, resetRouter } from '@/router'
const state = {
  token: getToken(), // 从缓存中读取初始值
  userInfo: {}, // 存储用户基本资料状态
  routes: constantRoutes // 初始值为静态路由的数组
}
const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到缓存
    setToken(token)
  },
  // 退出登录的时候调用
  removeToken(state) {
    state.token = null
    removeToken()
  },
  // 设置用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  // context上下文 传入参数
  async login(context, data) {
    console.log('data', data)
    // 调用接口
    const token = await login(data)
    // 返回token 123456（mock）
    context.commit('setToken', token)
  },
  // 获取用户基本资料
  async getUserInfo(context) {
    const result = await getUserInfo()
    context.commit('setUserInfo', result)
    return result // 返回数据
  },
  // 退出登录
  logout(context) {
    context.commit('removeToken') // 删除token
    context.commit('setUserInfo', {}) // 设置用户信息为空
    // 重置路由
    resetRouter()
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
