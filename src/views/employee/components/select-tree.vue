<template>
  <!-- 级联组件 -->
  <el-cascader
    size="mini"
    :options="treeData"
    :props="props"
    separator="-"
  />
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'

export default {
  name: 'SelectTree',
  data() {
    return {
      treeData: [], // 赋值给级联组件的options
      props: {
        label: 'name', // 要展示的字段
        value: 'id' // 要存储的字段
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      const data = await getDepartment()
      this.treeData = transListToTreeData(data, 0)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
