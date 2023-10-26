import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token' // 设置独一无二的key
const timeKey = 'hrsa-timestamp-key' // 设置独一无二的key

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 获取时间戳
export function getTimeSatmp() {
  return Cookies.get(timeKey)
}

// 设置时间戳
export function setTimeStamp() {
  return Cookies.set(timeKey, Date.now())
}
