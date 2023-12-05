<template>
  <div class="container">
    <div class="app-container">
      <el-button type="primary" size="mini" class="btnAdd" @click="addPermission(0, 1)">添加权限</el-button>
      <el-table 
        :data="list"
        row-key="id"
        default-expand-all>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="标识" prop="code"></el-table-column>
        <el-table-column label="描述" prop="description"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button size="mini" type="text" v-if="row.type === 1" @click="addPermission(row.id, 2)">添加</el-button>
            <el-button size="mini" type="text" @click="editPermission(row.id)">编辑</el-button>
            <el-button size="mini" type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <add-edit-permission ref="addEditPermission" :showDialog.sync="showDialog" @sendSuccess="getPermissionList"/>
  </div>
</template>
<script>
  import { getPermissionList, delPermission } from '@/api/permission'
  import { transListToTreeData } from '@/utils'
  import AddEditPermission from './components/add-edit-permission'
export default {
  name: 'Permission',
  components: {
    AddEditPermission,
  },
  data() {
    return {
      list: [],
      showDialog: false
    }
  },
  created () {
    this.getPermissionList();
  },
  methods: {
    async getPermissionList() {
      const result = await getPermissionList()
      this.list = transListToTreeData(result, 0) // 将列表数据转化成树形      
    },

    // 添加权限
    addPermission(pid, type) {
      // 一级权限（路由）的type 为1 二级权限（按钮）的type为2
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs.addEditPermission.addPermission(pid, type)
      });
    },
    // 编辑权限
    editPermission(id) {
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs.addEditPermission.editPermission(id)
      });
    },
    // 删除
    async delPermission(id) {
      try {
        await this.$confirm('确定要删除该数据吗')
        await delPermission(id)
        this.getPermissionList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
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