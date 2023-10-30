<template>
    <div class="dashboard-container">
      <div class="app-container">
        <!-- 组织架构的内容 头部-->
        <el-card class="tree-card">
         <tree-tools :isRoot="true" :treeNode="company"/>
          <!-- 放置一个el-tree -->
          <el-tree 
            :data="departs" 
            :props="defaultProps" 
            :default-expand-all="true">
            <!-- 作用域插槽：slot-scope -->
            <tree-tools :treeNode="data"  slot-scope="{data}"/>
          </el-tree>
        </el-card>
      </div>
    </div>
  </template>
  
  <script>
    import TreeTools from './components/tree-tools'
    import { getDepartments } from '@/api/departments'
    import { tranListToTreeData } from '@/utils'
  export default {
    name: 'departments',
    components: {
      TreeTools,
    },
    data() {
      return {
        company: {},
        departs: [],
        // props
        defaultProps: { // 告诉树显示哪个key对应的值
          label: 'name',
          // children: 'child' // 从这个属性找子节点
        }
      };
    },
    created () {
      this.getDepartments();
    },
    methods: {
      async getDepartments() {
        const result = await getDepartments();
        this.company = {name: result.companyName, manager: '负责人'}
        this.departs = tranListToTreeData(result.depts, '') // 需要将其转化成属性结构
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
  