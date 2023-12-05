<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input 
          style="margin-bottom:10px" 
          type="text"
          prefix-icon="el-icon-search"
          size="small" 
          placeholder="输入员工姓名全员搜索" 
          v-model="queryParams.keyword"
          @input="changeValue"
          />
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
          <el-button size="mini" type="primary" @click="$router.push('/employee/detail')" v-permission="'add-employee'">添加员工</el-button>
          <el-button size="mini" @click="showExcelDialog = true">excel导入</el-button>
          <el-button size="mini" @click="exportEmployee">excel导出</el-button>
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
          <el-table-column label="操作" width="160px">
            <template v-slot="{ row }">
              <el-button type="text" size="mini" @click="$router.push(`/employee/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="mini" @click="btnRole(row.id)">角色</el-button>
              <!-- <el-button type="text" size="mini">删除</el-button> -->
              <el-popconfirm
                title="确认删除改行数据吗？" @onConfirm="confirmDel(row.id)">
                <el-button slot="reference" type="text" size="mini" style="margin-left: 10px;">删除</el-button>
              </el-popconfirm>
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
            :total="total"
            :current-page="queryParams.page"
            :page-size="queryParams.pagesize"
            @current-change="handleCurrentChange">
        </el-pagination>
        </el-row>
      </div>
    </div>
    <!-- 放置excel导入组件 -->
    <import-excel :showExcelDialog.sync="showExcelDialog" @uploadSuccess="getEmployeeList"/>
    <el-dialog 
      width="80%"
      :visible.sync="showRoleDialog" 
      :title="'分配角色'">
      <el-checkbox-group v-model="roleIds">
        <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="mini" @click="btnRoleOk">确定</el-button>
          <el-button size="mini" @click="showRoleDialog = false">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import { getDepartment } from '@/api/department'
  import { getEmployeeList, exportEmployee, delEmployee, getEnabledRoleList, getEmployeeDetail, assignRole } from '@/api/employee'
  import { transListToTreeData } from '@/utils'
  import FileSaver from 'file-saver'
  import ImportExcel from './components/import-excel.vue'
export default {
  name: 'Employee',
  components: {
    ImportExcel,
  },
  data() {
    return {
      depts: [], // 组织数据
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      // 查询对应部门下员工接口
      queryParams: {
        departmentId: null,
        page: 1, // 当前页码
        pagesize: 10, // 每页条数
        keyword: '', // input输入框
      },
      list: [], // 存储员工列表数据
      total: 0, // 记录员工总数
      // excel 弹层
      showExcelDialog: false, // 控制excel弹层的显示和隐藏
      showRoleDialog: false, // 用来控制角色弹层的显示
      roleList: [], // 用来接收角色列表
      roleIds: [], // 双向绑定
      currentUserId: null, // 记录当前点击的用户id
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
      this.queryParams.page = 1 // 切换部门时，设置页码为1
      this.getEmployeeList() // 切换节点更新表格
    },
    // 获取员工列表
    async getEmployeeList() {
      const {rows, total} = await getEmployeeList(this.queryParams)
      this.list = rows
      this.total = total
    },
    // 切换页码
    handleCurrentChange(newPage) {
      this.queryParams.page = newPage
      this.getEmployeeList()
    },
    // 输入值内容改变时触发
    changeValue() {
      // 防抖处理 =》 单位事件之内只执行最后一次 
      // this的实例上赋值了一个timer的属性
      clearTimeout(this.timer) // 清理上一次的定时器
      this.timer = setTimeout(() => {
        this.queryParams.page = 1
        this.getEmployeeList()
      }, 300)
    },

    // 导出员工excel
    async exportEmployee() {
      const result = await exportEmployee() // 导出所有的员工接口
      // 使用npm包 =》 直接将blob文件下载到本地
      // FileSaver.saveAs(blob对象，文件名称)
      FileSaver.saveAs(result, '员工信息表.xlsx')
    },

    async confirmDel(id) {
      try {
        await delEmployee(id)
        if(this.list.length === 1 && this.queryParams.page > 1) { // 说明当前页没有数据
          this.queryParams.page--
        }
        this.getEmployeeList()
        this.$message.success('删除员工成功')
      } catch (error) {
        // console.log(error)
        
      }
    },

    async btnRole(id) {
      this.roleList = await getEnabledRoleList()
      // 记录当前点击的id 后面取消要存储给对应的用户
      this.currentUserId = id
      const {roleIds } = await getEmployeeDetail(id)
      this.roleIds = roleIds
      this.showRoleDialog = true

    },
    // 点击角色确定
    async btnRoleOk() {
      await assignRole({
        id: this.currentUserId,
        roleIds: this.roleIds
      })
      this.$message.success('分配用户角色成功')
      this.showRoleDialog = false
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