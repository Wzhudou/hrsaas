import layout from '@/layout'
export default {
  path: '/employee',
  name: 'employee',
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
    path: '/employee/detail/:id?', // 员工详情地址 ? 表示id这个参数 可以有也可以没有
    component: () => import('@/views/employee/detail.vue'),
    hidden: true, // 是否隐藏路由
    meta: {
      title: '员工详情'
    }
  }, {
    path: '/employee/print/:id?',
    component: () => import('@/views/employee/components/print.vue'),
    hidden: true,
    meta: {
      title: '员工打印'
    }
  }]
}

// 只想在左侧菜单显示一级菜单的话，只要将二级路由只有一个显示在左侧菜单
