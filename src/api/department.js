import request from '@/utils/request'

// 获取组织架构的数据
export function getDepartment() {
  return request({
    url: '/company/department'
  })
}

// 获取部门负责人的数据
export function getManagerList() {
  return request({
    url: '/sys/user/simple'
  })
}

// 获新增组织接口
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

// 获取部门详情API
export function getDepartmentDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

// 更新部门
export function updateDepartment(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}

// 删除部门
export function delDepartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
