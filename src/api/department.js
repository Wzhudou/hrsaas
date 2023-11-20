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
