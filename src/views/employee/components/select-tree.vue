<template>
  <!-- 级联组件 -->
  <el-cascader
    size="mini"
    :options="treeData"
    :props="props"
    separator="-"
    :value="value"
    popper-class="removeRadio"
    @change="changeValue"
  />
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'

export default {
  name: 'SelectTree',
  props: {
    // 这里必须是value =》 双向绑定
    value: {
      type: Number, // 部门的id
      default: null
    }
  },
  data() {
    return {
      treeData: [], // 赋值给级联组件的options
      props: {
        label: 'name', // 要展示的字段
        value: 'id', // 要存储的字段
        checkStrictly: true
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
    },
    changeValue(list) {
      // 取数组的最后以为
      if (list.length) {
        // 这里是input
        this.$emit('input', list[list.length - 1]) // 将最后一位的id取出，传出去
      } else {
        this.$emit('input', null) // 长度为0 说明为空
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
<style>
.removeRadio .el-radio__inner {
  border-radius: 0;
  border: 0;
  width: 170px;
  height: 34px;
  background-color: transparent;
  cursor: pointer;
  box-sizing: border-box;
  position: absolute;
  top: -18px;
  left: -19px;
}

.removeRadio .el-radio__input.is-checked .el-radio__inner {
  background: transparent;
}

</style>
