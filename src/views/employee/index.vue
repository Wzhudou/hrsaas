<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input style="margin-bottom:10px" type="text" prefix-icon="el-icon-search" size="small" placeholder="输入员工姓名全员搜索" />
        <!-- 树形组件 -->
        <el-tree 
          ref="deptTree"
          :data="depts" 
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false" 
          :highlight-current="true"
          node-key="id" 
          @current-change="selectNode">
        </el-tree>
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary">添加员工</el-button>
          <el-button size="mini">excel导入</el-button>
          <el-button size="mini">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="list">
          <el-table-column label="头像" prop="staffPhoto" align="center">
            <template v-slot="{ row }">
              <el-avatar v-if="row.staffPhoto" :src="row.staffPhoto" :size="30"></el-avatar>
              <span v-else class="username">{{ row.username.charAt(0) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="username"></el-table-column>
          <el-table-column label="手机号" prop="mobile" sortable></el-table-column>
          <el-table-column label="工号" prop="workNumber" sortable></el-table-column>
          <el-table-column label="聘用形式" prop="formOfEmployment">
            <template v-slot="{ row }">
              <span v-if="row.formOfEmployment === 1">正式</span>
              <span v-else-if="row.formOfEmployment === 2">非正式</span>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="departmentName"></el-table-column>
          <el-table-column label="入职时间" prop="timeOfEntry" sortable></el-table-column>
          <el-table-column label="操作" width="280px">
            <template>
              <el-button type="text" size="mini">查看</el-button>
              <el-button type="text" size="mini">角色</el-button>
              <el-button type="text" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="end" align="middle" style="height: 60px;">
          <!-- @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="100" -->
          <el-pagination
            layout="total, prev, pager, next"
            :total="1000">
        </el-pagination>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import { getDepartment } from '@/api/department'
  import { getEmployeeList } from '@/api/employee'
  import { transListToTreeData } from '@/utils'
export default {
  name: 'Employee',
  data() {
    return {
      depts: [], // 组织数据
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      // 查询对应部门下员工接口
      queryParams: {
        departmentId: null
      },
      list: [], // 存储员工列表数据
    }
  },
  created () {
    this.getDepartment();
  },
  methods: {
    async getDepartment() {
      const result = await getDepartment()
      // 递归 将数据转换成树形结构
      this.depts = transListToTreeData(result, 0)
      // console.log('this', this.depts[0]);
      // 记录节点
      this.queryParams.departmentId = this.depts[0].id;
      // 设置选择节点
      // 树组件的渲染是异步的 => 等到渲染完毕
      this.$nextTick(() => {
        // 此时意味着树的渲染完毕
        this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId)
      });
      // 这个时候参数记录了初始id
      this.getEmployeeList()
    },
    // 切换节点
    selectNode(node) {
      this.queryParams.departmentId = node.id // 重新记录了参数
      this.getEmployeeList() // 切换节点更新表格
    },
    // 获取员工列表
    async getEmployeeList() {
      const {rows, total} = await getEmployeeList(this.queryParams)
      this.list = rows
    }
  },
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;
  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }
  .right {
    flex: 1;
    padding: 20px;
    .opeate-tools {
      margin:10px ;
    }
    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display:inline-block;
    }
  }
}

</style>