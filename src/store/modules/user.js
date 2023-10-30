import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
// 状态
const state = {
  token: getToken(), // 设置token为共享状态, 初始化vuex从缓存中读取
  userInfo: {} // 用户资料 --- 为什么空对象 ？ ===》getters中引用userinfo里的变量，如果设置为null，泽会引起异常和报错
}
const mutations = {
  setToken(state, token) {
    state.token = token // 将数据设置给vuex
    setToken(token) // 同步给缓存
  },
  removeToken(state) {
    state.token = null // 将vuex数据置空
    removeToken() // 同步到缓存
  },
  // 设置用户信息
  setUserInfo(state, result) {
    state.userInfo = result // 这样是响应式
    // state.userInfo ={ ... result } // 这样也是响应式， 属于浅拷贝
    // state.userInfo['username'] = result // 这样不是响应式
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    // 调用api的接口
    const result = await login(data) // 获取token
    // 如果为true表示登录成功
    context.commit('setToken', result) // 设置token
    // 登录成功, 存入时间戳
    setTimeStamp() // 设置当前时间戳
  },
  logout(context) {
    // 删除token
    context.commit('removeToken')
    // 删除用户资料
    context.commit('removeUserInfo')
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    // 获取用户详情
    const baseInfo = await getUserDetailById(result.userId)
    const baseResult = { ...result, ...baseInfo }
    context.commit('setUserInfo', baseResult) // 提交用户信息
    return baseResult // 为什么这样写？ ===》 这里是为后期做权限的时候留下的伏笔
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions

}
// import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'
// import { logout } from './../../api/user';

// const getDefaultState = () => {
//   return {
//     token: getToken(),
//     name: '',
//     avatar: ''
//   }
// }

// const state = getDefaultState()

// const mutations = {
//   RESET_STATE: (state) => {
//     Object.assign(state, getDefaultState())
//   },
//   SET_TOKEN: (state, token) => {
//     state.token = token
//   },
//   SET_NAME: (state, name) => {
//     state.name = name
//   },
//   SET_AVATAR: (state, avatar) => {
//     state.avatar = avatar
//   }
// }

// const actions = {
//   // user login
//   login({ commit }, userInfo) {
//     const { username, password } = userInfo
//     return new Promise((resolve, reject) => {
//       login({ username: username.trim(), password: password }).then(response => {
//         const { data } = response
//         commit('SET_TOKEN', data.token)
//         setToken(data.token)
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // get user info
//   getInfo({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       getInfo(state.token).then(response => {
//         const { data } = response

//         if (!data) {
//           return reject('Verification failed, please Login again.')
//         }

//         const { name, avatar } = data

//         commit('SET_NAME', name)
//         commit('SET_AVATAR', avatar)
//         resolve(data)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // user logout
//   logout({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       logout(state.token).then(() => {
//         removeToken() // must remove  token  first
//         resetRouter()
//         commit('RESET_STATE')
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // remove token
//   resetToken({ commit }) {
//     return new Promise(resolve => {
//       removeToken() // must remove  token  first
//       commit('RESET_STATE')
//       resolve()
//     })
//   }
// }

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }

