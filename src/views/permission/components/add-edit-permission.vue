<template>
    <!-- 放置一个弹层 用来编辑新增节点 -->
   <el-dialog 
        :title="`${showText}权限`" 
        :visible="showDialog"
         @close="btnCancel">
      <!-- 表单 -->
      <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input type="textarea" v-model="formData.description" style="width:90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
</template>

<script>
import { updatePermission, addPermission, getPermissionDetail } from '@/api/permission'
    export default {
        name: 'AddEditPermission',
        props: {
            showDialog: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                formData: {
                    name: '',
                    code: '',
                    description: '',
                    enVisible: 0,
                    type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
                    pid: ''
                },
                rules: {
                    name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
                    code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
                },
            }
        },
        computed: {
            showText() {
                return this.formData.id ? '编辑' : '新增'
            }
        },
        methods: {
            // 添加
            addPermission(pid, type) {
                this.formData.pid = pid
                this.formData.type = type
            },
            // 编辑
            async editPermission(id) {
                this.formData = await getPermissionDetail(id)
            },
            btnCancel() {
                this.formData = {
                    name: '', // 名称
                    code: '', // 标识
                    description: '', // 描述
                    type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
                    pid: '', // 因为做的是树 需要知道添加到哪个节点下了
                    enVisible: "0" // 默认关闭
                }
                this.$refs.perForm.resetFields()
                this.$emit('update:showDialog', false) 
            },
            btnOK() {
                this.$refs.perForm.validate().then(() => {
                    if (this.formData.id) {
                        return updatePermission(this.formData)
                    }
                    return addPermission(this.formData)
                }).then(() => {
                    //  提示消息
                    this.$message.success('新增成功')
                    this.$emit('sendSuccess')
                    this.$emit('update:showDialog', false) 
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>