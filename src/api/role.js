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
    data
  })
}

// 更新角色
export function updateRole(data) {
  return request({
    method: 'put',
    url: `/sys/role/${data.id}`,
    data
  })
}

// 删除角色
export function delRole(id) {
  return request({
    method: 'delete',
    url: `/sys/role/${id}`
  })
}

// 获取角色详情
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

// 给角色分配权限
export function assignPerm(data) {
  return request({
    url: `/sys/role/assignPerm`,
    method: 'put',
    data
  })
}

