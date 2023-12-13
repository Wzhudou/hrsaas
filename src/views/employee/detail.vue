<template>
    <div class="dashboard-container">
      <div class="app-container">
        <el-tabs v-model="activeName">
          <el-tab-pane label="个人详情" name="first">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                  <router-link :to="`/employee/print/${userId}?type=personal`">
                    <i class="el-icon-printer" />
                  </router-link>
               </el-tooltip>
              </el-row>
            <div class="edit-form">
              <el-form ref="userForm" :model="userInfo" :rules="rules" label-width="220px">
                <!-- 姓名 部门 -->
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="姓名" prop="username">
                      <el-input size="mini" v-model="userInfo.username" class="inputW" />
                    </el-form-item>
                  </el-col>
      
                </el-row>
                <!-- 工号 入职时间 -->
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="工号" prop="workNumber">
                        <!-- 工号系统生成 禁用组件 -->
                      <el-input size="mini" disabled v-model="userInfo.workNumber" class="inputW" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--手机 聘用形式  -->
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="手机" prop="mobile">
                      <el-input
                        size="mini"
                        v-model="userInfo.mobile"
                        class="inputW"
                        :disabled="!!$route.params.id"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="部门" prop="departmentId">
                      <!-- 放置及联部门组件 单独封装 inputW会给到子组件的第一层-->
                      <select-tree v-model="userInfo.departmentId" class="inputW" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="聘用形式" prop="formOfEmployment">
                      <el-select size="mini" v-model="userInfo.formOfEmployment" class="inputW">
                        <el-option label="正式" :value="1"></el-option>
                        <el-option label="非正式" :value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="入职时间" prop="timeOfEntry">
                      <el-date-picker
                        size="mini"
                        type="date"
                        v-model="userInfo.timeOfEntry"
                        value-format="yyyy-MM-dd"
                        class="inputW"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="转正时间" prop="correctionTime">
                      <el-date-picker
                        size="mini"
                        type="date"
                        v-model="userInfo.correctionTime"
                        class="inputW"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 员工照片 -->
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="员工头像">
                      <!-- 放置上传图片 -->
                      <image-upload v-model="userInfo.staffPhoto" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 保存个人信息 -->
                <el-row type="flex">
                  <el-col :span="12" style="margin-left:220px">
                    <el-button size="mini" type="primary" @click="saveData">保存更新</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="岗位详情" name="second">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印岗位信息">
                <router-link :to="`/employee/print/${userId}?type=job`">
                  <i class="el-icon-printer"  />
                </router-link>
              </el-tooltip>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </template>
  
<script>
  import SelectTree from './components/select-tree.vue'
  import ImageUpload from './components/image-upload.vue'
  import { addEmployee, getEmployeeDetail, updateEmployee } from '@/api/employee'
    export default {
      components: {
        SelectTree,
        ImageUpload,
      },
      data() {
        return {
          activeName: 'first',
          userInfo: {
            username: '', // 用户名
            mobile: '', // 手机号
            workNumber: '', // 工号
            formOfEmployment: null, // 聘用形式
            departmentId: null, // 部门id
            timeOfEntry: '', // 入职时间
            correctionTime: '', // 转正时间
            // http://5b0988e595225.cdn.sohucs.com/images/20190208/46b5e0fe4b194507804bc1724f4a39ed.jpeg
            staffPhoto: '', // 员工头像
          },
          rules: {
            username: [
                { required: true, message: '请输入姓名', trigger: 'blur' }, 
                { min: 1, max: 4, message: '姓名为1-4位' }
            ],
            mobile: [
                { required: true, message: '请输入手机号', trigger: 'blur' }, 
                { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'} //   pattern 正则表达式
            ],
            formOfEmployment: [
                { required: true, message: '请选择聘用形式', trigger: 'blur' }
            ],
            departmentId: [
                { required: true, message: '请选择部门', trigger: 'blur' }
            ],
            timeOfEntry: [
                { required: true, message: '请选择入职时间', trigger: 'blur' }
            ],
            correctionTime: [
                { required: true, message: '请选择转正时间', trigger: 'blur' },
                { validator: (rule, value, callback) => {
                    if (this.userInfo.timeOfEntry) {
                        if (new Date(this.userInfo.timeOfEntry) > new Date(value)) {
                            callback(new Error('转正时间不能小于入职时间'))
                            return
                        }
                    }
                    callback()
                    }
                }   
            ]
          }
    
        }
      },
      created () {
        // 获取路由参数id
        // if(this.$route.params.id) {
        //   this.getEmployeeDetail()
        // }
        this.$route.params.id && this.getEmployeeDetail()
      },
      methods: {
        async getEmployeeDetail() {
          this.userInfo = await getEmployeeDetail(this.$route.params.id)
        },
        saveData() {
          this.$refs.userForm.validate(async isOk => {
            if(isOk) {
              // 编辑模式
              if(this.$route.params.id) {
                await updateEmployee(this.userInfo)
                this.$message.success('更新员工成功')
              } else {
                await addEmployee(this.userInfo)
                this.$message.success('新增员工成功')
              }
              // 校验通过
              this.$router.push('/employee')
            }
          })
        }
      }
    }
</script>
  
  <style scoped lang="scss">
    .app-container {
      padding: 20px;
    }
      .edit-form {
        background: #fff;
        padding: 20px;
        .inputW {
          width: 380px
        }
      }
  
  </style>