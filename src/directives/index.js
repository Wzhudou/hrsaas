// import Vue from 'vue'
import store from '@/store'
// // 注册自定义指定 控制功能权限
// Vue.directive('permission', {
//   // 会在指定所作用的元素插入dom之后执行
//   inserted(el, binding) {
//     // el 是当前指定作用的dom元素的对象
//     // bingding 是v-permission="表达式" 表达式的信息
//     console.log('1111', el, binding)
//   }
// })

export const permission = {
  // 会在指定所作用的元素插入dom之后执行
  inserted(el, binding) {
    // el 是当前指定作用的dom元素的对象
    // bingding 是v-permission="表达式" 表达式的信息
    const points = store.state.user.userInfo?.roles?.points || [] // 拿到了按钮权限列表
    // console.log('ppppp', points)
    // points是否有该按钮的权限 bingd.value 是 v-permission="表达式" 中表达式的值 也就是按钮的权限表示
    if (!points.includes(binding.value)) {
      // 删除或者禁用
    //   el.remove() // 删除
      el.disabled = true // 禁用
    }
  }
}
