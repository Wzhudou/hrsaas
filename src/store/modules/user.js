import { getToken, setToken, removeToken } from '@/utils/auth' //
import { login, getUserInfo } from '@/api/user'
const state = {
  token: getToken(), // 从缓存中读取初始值
  userInfo: {} // 存储用户基本资料状态
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

  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
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
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
