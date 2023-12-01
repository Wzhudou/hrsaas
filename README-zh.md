### 1 可选链操作符 见Navbar
```
null.name ==> 控制台报错
null?.name ===> undefined
```
### 2 组件的双向绑定
```
见 detail.vue和select-tree.vue组件

v-model 双向绑定
① 子组件：接收value属性 绑定级联属性 级联改变触发 触发input事件
② 父组件：v-model 绑定属性
```