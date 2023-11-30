import layout from '@/layout'
export default {
  path: '/employee',
  component: layout,
  children: [{
    path: '',
    name: 'employee',
    component: () => import('@/views/employee'),
    meta: {
      title: '员工',
      icon: 'people'
    }
  }, {
    path: '/employee/detail', // 员工详情地址
    component: () => import('@/views/employee/detail.vue'),
    hidden: true, // 是否隐藏路由
    meta: {
      title: '员工详情'
    }
  }]
}

// 只想在左侧菜单显示一级菜单的话，只要将二级路由只有一个显示在左侧菜单
