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
            <el-input v-model="row.editRow.name" v-if="row.isEdit"></el-input>
            <span v-else> {{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="启用" align="center" width="200px">
          <template v-slot = "{ row }">
            <el-switch v-model="row.editRow.state" v-if="row.isEdit" :active-value="1" :inactive-value="0"></el-switch>
            <span v-else>{{ row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" align="center">
          <template v-slot = '{ row }'>
            <!-- 条件判断 -->
            <el-input type="textarea" v-model="row.editRow.description" v-if="row.isEdit" size="mini"></el-input>
            <span v-else> {{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="{ row }">
            <template v-if="row.isEdit">
              <!-- 编辑 -->
              <el-button type="primary" size="mini" @click="btnEditOk(row)">确定</el-button>
              <el-button size="mini" @click="row.isEdit = false">取消</el-button>
            </template>
            <template v-else>
              <el-button type="text" size="mini" @click="btnPermission(row.id)">分配权限</el-button>
              <el-button type="text" size="mini" @click="btnEditRow(row)">编辑</el-button>
              <!-- <el-button type="text" size="mini">删除</el-button>     -->
              <el-popconfirm
                title="这是一段内容确定删除吗？" @onConfirm="confirmDel(row.id)">
                <el-button slot="reference" type="text" size="mini" style="margin-left: 10px;">删除</el-button>
              </el-popconfirm>
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
    <!-- 权限弹层 -->
    <el-dialog 
      :visible.sync="showPermissionDialog" title="分配权限">
      <!-- 防止权限数据 -->
      <el-tree 
        ref="permTree"
        node-key="id"
        :data="permissionData"
        :props="{label: 'name'}"
        show-checkbox 
        default-expand-all
        :default-checked-keys="permIds"
        check-strictly></el-tree>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button type="primary" size="mini" @click="btnPermissionOk">确定</el-button>
            <el-button size="mini" @click="showPermissionDialog = false">取消</el-button>
          </el-col>
        </el-row>
    </el-dialog>
  </div>
</template>
<script>
  import { getRoleList, addRole, updateRole, delRole, getRoleDetail, assignPerm } from '@/api/role'
  import { getPermissionList } from '@/api/permission'
  import { transListToTreeData } from '@/utils'

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
      },
      showPermissionDialog: false, // 是否显示权限弹层
      permissionData: [], // 权限数据
      currentRoleId: null, // 当前选择的id
      permIds: [], //
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
        // 声明缓存数据
        this.$set(item, 'editRow', {
          name: item.name,
          description: item.description,
          state: item.state
        })
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
      // 点击编辑时，显示当前行展示的数据
      row.editRow.name = row.name
      row.editRow.state = row.state
      row.editRow.description = row.description
    },
    // 点击确定时触发
    async btnEditOk(row) {
      if(row.editRow.name && row.editRow.description) {
        // 下一步操作
        await updateRole({...row.editRow, id: row.id })
        // 更新显示的数据 并退出编辑状态
        // row.name = row.editRow.name
        // row.state = row.editRow.state
        // row.description = row.editRow.description
        // row.isEdit = false
        Object.assign(row, { 
          ...row.editRow,
           isEdit: false // 退出编辑模式
          })
        // 更新成功
        this.$message.success('更新角色成功')
      } else {
        this.$message.warning('角色和描述不能为空');
      }
    },

    // 点击确认触发
    async confirmDel(id) {
      await delRole(id)
      this.$message.success('删除角色成功')
      // 如果删除的是最后一个 => 只是删除了，但是后端数据还没有删除
      if(this.list.length === 1) {
        this.pageParams.page--
      }
      this.getRoleList()
    },

    async btnPermission(id) {
      this.currentRoleId = id
      // 获取角色详情
      const { permIds } = await getRoleDetail(id)
      this.permIds  = permIds
      // 获取权限列表
      const result = await getPermissionList()
      this.permissionData = transListToTreeData(result, 0)  
      this.showPermissionDialog = true

    },
    // 点击ok
    async btnPermissionOk() {
      await assignPerm({
        id: this.currentRoleId,
        permIds: this.$refs.permTree.getCheckedKeys()
      })
      this.$message.success('角色分配权限成功')
      this.showPermissionDialog = false
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
