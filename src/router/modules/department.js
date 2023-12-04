import Layout from '@/layout'
export default {
  // 路由信息
  path: '/department',
  name: 'department',
  component: Layout, // 一级路由
  children: [{
    path: '', // 二级路由地址为空时，表示/department显示一级路由 + 二级路由
    component: () => import('@/views/department'),
    name: 'department', // 可以用来跳转也可以标记路由
    meta: {
      // 路由元信息 =》 存储数据
      icon: 'tree', // 菜单图标
      title: '组织' // 菜单标题
    }
  }]
}
