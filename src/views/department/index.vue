<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <el-tree default-expand-all :data="depts" :props="defaultProps">
        <!-- 节点结构 -->
        <!-- v-slot="{node, data}" 只能作用在template标签上-->
        <template v-slot="{data}">
          <el-row style="width: 100%; height: 40px;" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{data.managerName}}</span>
              <el-dropdown>
                <!-- 显示区域的内容 -->
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <!-- 下拉菜单的选项 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                  <el-dropdown-item>编辑部门</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Department',
  data() {
    return {
      depts: [{
        name: '传智播客',
        managerName: '管理员',
        children: [{
          name: '总裁办',
          managerName: 'zs'
        },{
          name: '行政部',
          managerName: 'li'
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
  .tree-manager {
    width: 50px;
    display: inline-block;
    margin: 10px;
  }
}
</style>
