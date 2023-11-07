<template>
    <div class="dashboard-container">
      <div class="app-container">
        <!-- 组织架构的内容 头部-->
        <el-card class="tree-card">
         <tree-tools :isRoot="true" :treeNode="company" @addDepts="addDepts"/>
          <!-- 放置一个el-tree -->
          <el-tree 
            :data="departs" 
            :props="defaultProps" 
            :default-expand-all="true">
            <!-- 作用域插槽：slot-scope -->
            <tree-tools :treeNode="data"  slot-scope="{data}" @delDepts="delDepts" @addDepts="addDepts" @editDepts="editDepts"/>
          </el-tree>
        </el-card>
      </div>
      <add-dept ref="addDept" :show-dialog.sync="showDialog" :treeNode="node" @addDepts="getDepartments"/>
    </div>
  </template>
  
  <script>
    import TreeTools from './components/tree-tools'
    import AddDept from './components/add-dept'
    import { getDepartments } from '@/api/departments'
    import { tranListToTreeData } from '@/utils'
  export default {
    name: 'departments',
    components: {
      TreeTools,
      AddDept
    },
    data() {
      return {
        company: {},
        departs: [],
        // props
        defaultProps: { // 告诉树显示哪个key对应的值
          label: 'name',
          // children: 'child' // 从这个属性找子节点
        },
        showDialog: false,
        node: null // 记录当前点击的node节点
      };
    },
    created () {
      this.getDepartments();
    },
    methods: {
      // 获取部门信息
      async getDepartments() {
        const result = await getDepartments();
        this.company = {name: result.companyName, manager: '负责人', id: ''}
        this.departs = tranListToTreeData(result.depts, '') // 需要将其转化成属性结构
      },
      // 删除部门
      delDepts() {
        this.getDepartments()
      },
      // 添加子部门 node当前点击的部门
      addDepts(node) {
        this.showDialog = true
        this.node = node
      },
      // 编辑部门
      editDepts(node) {
        this.showDialog = true
        this.node = node
        // 这里调用获取部门详情的方法
        // this.$refs.addDept.getDepartDetail(node.id)
      }
    },
  }
  </script>
  
  <style scoped lang="scss">
    .tree-card {
      padding: 30px 140px;
      font-size: 14px;
    }
  </style>
  