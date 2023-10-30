// import Vue from 'vue'

// Vue.directive('指定名称', {
//   // 会在当前指定作用的dom元素插入之后执行
//   // 常用 options 里面是指定的表达式
//   inserted: function(dom, options) {}
// //   bind(el, binding, vnode) {},
// //   inserted(el, binding, vnode) {},
// //   update(el, binding, vnode, oldVnode) {},
// //   componentUpdated(el, binding, vnode) {},
// //   unbind(el, binding, vnode) {}
// })

// 负责管理所有的自定义指令
export const imagerror = {
  // 指定对象， 会在当前的dom元素插入到节点之后执行
  inserted(dom, options) {
    // options是指令中的变量的解释 其中有个属性叫做value，就是所传的变量的值，比如img
    // dom 表示当前指定作用的dom对象
    // dom此时就是图片
    // 当图片有地址，但是地址没有加载成功的时候 会报错， 会触发图片的一个事件 =》 onerror
    dom.onerror = function() {
      // 当图片出现异常的时候， 会将之灵配置的默认图片设置为该图片的内容
      // dom注册error事件
      dom.src = options.value // 这里不能写死
    }
  }
}

// <img v-imagerror="img" />

// data() {return { img: 'a.png'}}
