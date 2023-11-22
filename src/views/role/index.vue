<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理的内容 -->
      <div class="role-operate">
        <el-button type="primary" size="mini">添加角色</el-button>
      </div>
      <!-- 表格组件 -->
      <el-table :data="list">
        <el-table-column prop="name" label="角色" align="center" width="200px"></el-table-column>
        <el-table-column prop="state" label="启用" align="center" width="200px"></el-table-column>
        <el-table-column prop="description" label="描述" align="center"></el-table-column>
        <el-table-column label="操作" align="center"></el-table-column>
      </el-table>
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          layout="prev, pager, next">
      </el-pagination>
      </el-row>
    </div>
  </div>
</template>
<script>
  import { getRoleList } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      list: []
    }
  },
  created () {
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      const {rows, total} = await getRoleList()
      this.list = rows;
    }
  },
}
</script>

<style lang="scss" scoped>
.app-container {
  .role-operate {
    padding: 10px;
  }
}
</style>
