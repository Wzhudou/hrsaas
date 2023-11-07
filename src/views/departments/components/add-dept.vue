<template>
  <el-dialog title="新增部门" :visible="showDialog" @close="btnCancel">
    <el-form ref="deptForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" autocomplete="off" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" autocomplete="off" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" autocomplete="off" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取 消</el-button>
        <el-button type="primary" size="small" @click="btnOk">确 定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartments, getDepartDetail } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 检查部门名称是否重复
    const checkNameRepeat = async(rule, value, callback) => {
      // value 是部门名称，要去和同级部门下的部门比较，有没有相同的， =》 相同的不能过
      const { depts } = await getDepartments()
      // 去找同级部门下，有没有value相同的 => isRepeat true表示有一样的名字
      const isReapt = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      isReapt ? callback(new Error(`同级部门下已经存在这个${value}部门`)) : callback()
    }
    // 检查部门编码是否重复
    const checkCodeRepeat = async(rule, value, callback) => {
      // value 是部门编码，要求所有的部门编码都不能重复
      const { depts } = await getDepartments()
      // 由于历史数据有可能没有code，所以需要加一个强制性条件
      const isReapt = depts.some(item => item.code === value && value)
      isReapt ? callback(new Error(`组织架构下已经存在这个${value}编码`)) : callback()
    }
    return {
      dialogFormVisible: true,
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkNameRepeat }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkCodeRepeat }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }
        ]
      },
      peoples: {}
    }
  },

  methods: {
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    btnOk() {
      // 校验表单
      this.$refs.deptForm.validate(async isOk => {
        if (isOk) {
          // 通过
          // 这里我们将ID设置成pid
          await addDepartments({ ...this.formData, pid: this.treeNode.id })
          this.$emit('addDepts') // 触发一个自定义事件
          // 此时应该去修改showDialog的值
          this.$emit('update:showDialog', false)
        }
      })
    },
    // 取消
    btnCancel() {
      this.$emit('update:showDialog', false) // 关闭弹层
      // 清除之前的校验
      this.$refs.deptForm.resetFields()
    },
    // 获取部门详情
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
      // 因为是父组件调用子组件的方法，先设置node数据，直接调用方法 ===》props传值是异步的 ===>导致this.treeNode有可能还未传来值
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
