<template>
  <div class="container">
    <div class="app-container">
      <el-button type="primary" size="mini" class="btnAdd">添加权限</el-button>
      <el-table 
        :data="list"
        row-key="id"
        default-expand-all>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="标识" prop="code"></el-table-column>
        <el-table-column label="描述" prop="description"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button size="mini" type="text" v-if="row.type === 1">添加</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import { getPermissionList } from '@/api/permission'
  import { transListToTreeData } from '@/utils'

export default {
  name: 'Permission',
  data() {
    return {
      list: []
    }
  },
  created () {
    this.getPermissionList();
  },
  methods: {
    async getPermissionList() {
      const result = await getPermissionList()
      this.list = transListToTreeData(result, 0) // 将列表数据转化成树形
      console.log(';;;;', this.list);
      
    }
  },
}
</script>
<style lang="scss" scoped>
  .app-container {
    .btnAdd{
      margin: 10px;
    }
  }
</style>