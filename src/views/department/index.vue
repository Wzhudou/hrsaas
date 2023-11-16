<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <el-tree default-expand-all :data="depts" :props="defaultProps"></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Department',
  data() {
    return {
      depts: [{
        name: '缠枝',
        children: [{
          name: 'test'
        }]
      }], // 数据属性
      // 
      defaultProps: {
        label: 'name', // 表示显示的字段名字
        children: 'children' // 读取子节点的字段名
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
