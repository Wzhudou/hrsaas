import Layout from '@/layout'
// 员工路由规则
export default {
  path: '/employees', // 路由地址
  component: Layout,
  name: 'employees', // 为什么加？ =》 权限的时候会用到
  children: [{ // 二级路由的path什么都不写的时候，此时它表示二级路由的默认路由 ===》 这样显示一级的布局二级的显示
    path: '', // 路由地址 ---> 这里不用写===》 什么都不写表示/employees 不但有布局layout还有员工主页
    component: () => import('@/views/employees'),
    meta: { // 路由元信息 ==》 就是存储数据的地方可以放任何内容 ==> 用title的原因是左侧导航读取了title的属性
      title: '员工管理',
      icon: 'people'
    }
  }]
}
