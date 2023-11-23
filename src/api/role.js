import request from '@/utils/request'

// 获取角色列表
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params // 查询参数
  })
}

// 新增角色
export function addRole(data) {
  return request({
    method: 'post',
    url: '/sys/role',
    data // 查询参数
  })
}
