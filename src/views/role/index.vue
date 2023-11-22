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
        <el-table-column prop="state" label="启用" align="center" width="200px">
          <template v-slot = "{ row }">
            <span>{{ row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="{ row }">
            <el-button type="text" size="mini">分配权限</el-button>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          :page-size="pageParams.pagesize"
          :current-page="pageParams.page"
          :total="pageParams.total"
          layout="prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
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
      list: [],
      // 分页信息
      pageParams: {
        page: 1, // 第几页
        pagesize: 5, // 每页条数
        total: 0, // 总数
      }
    }
  },
  created () {
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      const {rows, total} = await getRoleList(this.pageParams)
      this.list = rows;
      this.pageParams.total = total
    },
    handleSizeChange() {},
    
    // 切换分页请求数据
    handleCurrentChange(newPage) {
      this.pageParams.page = newPage
      this.getRoleList()
    },
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
