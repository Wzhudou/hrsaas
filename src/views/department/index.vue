<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <el-tree default-expand-all :data="depts" :props="defaultProps" :expand-on-click-node="false">
        <!-- 节点结构 -->
        <!-- v-slot="{node, data}" 只能作用在template标签上-->
        <template v-slot="{data}">
          <el-row style="width: 100%; height: 40px;" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{data.managerName}}</span>
              <el-dropdown @command="operateDept($event, data.id)">
                <!-- 显示区域的内容 -->
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <!-- 下拉菜单的选项 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <!-- 放置弹层 sync => 表示会接受子组件的事件 update:showDialog, 值 =》 属性赋值给showDialog-->
    <add-dept ref="addDept" :showDialog.sync="showDialog" :currentNodeId="currentNodeId" @updateDepartment="getDepartment"/>
  </div>
</template>

<script>
  import { getDepartment , delDepartment } from '@/api/department'
  import { transListToTreeData } from '@/utils'
  import AddDept from './components/add-dept'
export default {
  name: 'Department',
  components: {
    AddDept,
  },
  data() {
    return {
      depts: [], // 数据属性
      // 
      defaultProps: {
        label: 'name', // 表示显示的字段名字
        children: 'children' // 读取子节点的字段名
      },
      showDialog: false, // 控制弹层的显示和隐藏
      currentNodeId: null, // 存储当前点击的id
    }
  },
  created() {
    this.getDepartment() // 获取数据的接口
  },
  methods: {
    async getDepartment() {
      const result = await getDepartment()
      this.depts = transListToTreeData(result, 0)
    },
    // 操作部门方法
    operateDept(type, id) {
      if(type === 'add') {
        // 添加子部门
        this.showDialog = true
        this.currentNodeId = id
      } else if(type === 'edit') {
        // 编辑部门
        this.showDialog = true
        this.currentNodeId = id
        // 子组件获取数据 =》 子组件调用子组件的方法获取数据
       this.$nextTick(() => {
        this.$refs.addDept.getDepartmentDetail(id) // 等同于子组件的this
       });
      } else {
        // 删除部门操作
        this.$confirm('您确定要删除该部门吗').then(async() => {
          await delDepartment(id)
          this.$message.success('删除部门成功')
          this.getDepartment()
        }).catch(() => {})
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
