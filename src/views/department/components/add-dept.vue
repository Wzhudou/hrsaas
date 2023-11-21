<template>
  <el-dialog title="新增部门" :visible="showDialog" @close="close">
    <!-- 防止弹层内容 -->
    <el-form ref="addDept" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="2-10个字符" style="width: 80%;" size="mini" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="2-10个字符" style="width: 80%;" size="mini" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="managerId">
        <el-select v-model="formData.managerId" placeholder="请选择负责人" style="width: 80%;" size="mini">
          <el-option
            v-for="item in managerList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" placeholder="1-100个字符" style="width: 80%;" type="textarea" :rows="4" size="mini" />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" size="mini" @click="btnOk">确定</el-button>
            <el-button size="mini" @click="close">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getDepartment, getManagerList, addDepartment, getDepartmentDetail } from '@/api/department'
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    currentNodeId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      formData: {
        code: '', // 部门编码
        introduce: '', // 部门介绍
        managerId: '', // 部门负责人id
        name: '', // 部门的名称
        pid: '' // 父级部门的id
      },
      rules: {
        code: [ // 部门编码
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门编码的长度为2-10个字符', trigger: 'blur' },
          { trigger: 'blur', validator: async(rule, value, callback) => {
            const result = await getDepartment()
            // 检查result数组中是否存在value
            if (result.some(item => item.code === value)) {
              // true=》存在
              callback(new Error('部门中已经有该编码'))
            } else {
              callback()
            }
          } }
        ],
        introduce: [ // 部门介绍
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '部门介绍的长度为1-100个字符', trigger: 'blur' }
        ],
        managerId: [ // 部门负责人id
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        name: [ // 部门的名称
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门名称的长度为2-10个字符', trigger: 'blur' },
          { trigger: 'blur', validator: async(rule, value, callback) => {
            const result = await getDepartment()
            // 检查result数组中是否存在value
            if (result.some(item => item.name === value)) {
              // true=》存在
              callback(new Error('部门中已经有该名称'))
            } else {
              callback()
            }
          } }
        ]
        // pid: '', // 父级部门的id
      },
      managerList: [] // 存储负责人的列表
    }
  },
  created() {
    this.getManagerList()
  },
  methods: {
    close() {
      // 重置表单
      this.$refs.addDept.resetFields()
      // 关闭弹层
      // 修改父组件的值
      this.$emit('update:showDialog', false)
    },
    // 获取负责人列表数据
    async getManagerList() {
      this.managerList = await getManagerList()
    },
    // 点击确定调用
    btnOk() {
      this.$refs.addDept.validate(async isOk => {
        if (isOk) {
          // 调用新增接口
          await addDepartment({ ...this.formData, pid: this.currentNodeId })
          // 通知父组件更新
          this.$emit('updateDepartment')
          this.$message.success('新增部门成功')
          this.close()
        }
      })
    },
    // 获取组织的详情
    async getDepartmentDetail(id) {
      this.formData = await getDepartmentDetail(id)
      console.log('id', this.formData)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
