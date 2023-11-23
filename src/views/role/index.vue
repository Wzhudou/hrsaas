<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理的内容 -->
      <div class="role-operate">
        <el-button type="primary" size="mini" @click="showDialog = true">添加角色</el-button>
      </div>
      <!-- 表格组件 -->
      <el-table :data="list">
        <el-table-column prop="name" label="角色" align="center" width="200px">
          <template v-slot = '{ row }'>
            <!-- 条件判断 -->
            <el-input v-if="row.isEdit"></el-input>
            <span v-else> {{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="启用" align="center" width="200px">
          <template v-slot = "{ row }">
            <el-switch v-if="row.isEdit"></el-switch>
            <span v-else>{{ row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" align="center">
          <template v-slot = '{ row }'>
            <!-- 条件判断 -->
            <el-input type="textarea" v-if="row.isEdit" size="mini"></el-input>
            <span v-else> {{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="{ row }">
            <template v-if="row.isEdit">
              <!-- 编辑 -->
              <el-button type="primary" size="mini">确定</el-button>
              <el-button size="mini">取消</el-button>
            </template>
            <template v-else>
              <el-button type="text" size="mini">分配权限</el-button>
              <el-button type="text" size="mini" @click="btnEditRow(row)">编辑</el-button>
              <el-button type="text" size="mini">删除</el-button>    
            </template>
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
    <!-- 放置弹层 -->
    <el-dialog title="新增角色" width="500px" :visible.sync="showDialog" @close="btnCancel">
      <el-form :model="roleForm" :rules="rules" ref="roleForm">
        <el-form-item prop="name" label="角色名称" label-width="120px">
          <el-input v-model="roleForm.name" style="width: 300px;" size="mini"></el-input>
        </el-form-item>
        <!-- 重置表单数据，需要prop属性 -->
        <!-- 如果不需要校验 就不需要写 prop属性 -->
        <el-form-item label="启用" label-width="120px" prop="state">
          <el-switch size="mini" v-model="roleForm.state" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item prop="description" label="角色描述" label-width="120px">
          <el-input type="textarea" :rows="3" v-model="roleForm.description" style="width: 300px;" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button @click="btnOk" size="mini" type="primary">确定</el-button>
              <el-button @click= "btnCancel" size="mini">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import { getRoleList, addRole } from '@/api/role'
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
      },
      showDialog: false, // 控制弹层显示隐藏
      roleForm: {
        name: '',
        description: '',
        state: 0, // 0表示未启用， 1表示启用
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur'},
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur'},
        ],
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
      // 针对每一行数据添加编辑标记
      this.list.forEach(item => {
        // item.isEdit = false // 初始值为false =》动态添加
        // 数据响应式：数据变化 视图更新 =》针对已有的属性
        // 添加的动态属性 =》 不具备响应式特点
        this.$set(item, 'isEdit', false); // 可以针对目标对象 添加属性 添加响应式 (目标对象, 属性名称, 初始值)
      });
    },
    handleSizeChange() {},
    
    // 切换分页请求数据
    handleCurrentChange(newPage) {
      this.pageParams.page = newPage
      this.getRoleList()
    },
    btnOk() {
      this.$refs.roleForm.validate(async isOk => {
        if(isOk) {
          await addRole(this.roleForm)
          this.$message.success('新增角色成功')
          this.getRoleList()
          this.btnCancel()
        }
      })
    },
    btnCancel() {
      this.$refs.roleForm.resetFields()

      this.showDialog = false
    },
    // 点击edit
    btnEditRow(row) {
      row.isEdit = true
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
