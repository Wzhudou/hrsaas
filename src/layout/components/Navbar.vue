<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <!-- 防止全屏插件 -->
      <screen-full/>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="avatar" :src="avatar" class="user-avatar">
          <span class="username" v-else>{{ name?.charAt(0) }}</span>
          <span class="name">{{ name }}</span>
          <!-- 图标 -->
          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <!-- 阻止默认事件 -->
          <a target="_blank" @click.prevent="updatePassword">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <!-- native事件的修饰符 =》 注册组件根元素的原生事件 -->
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- sync  接收子组件传过来的事件和值 -->
    <el-dialog title="修改密码" :visible.sync="showDialog" width="500px" :append-to-body="true" @close="btnCancel">
      <el-form ref="passForm" :model="passForm" :rules="rules" label-width="120px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="passForm.oldPassword" size="small" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passForm.newPassword" size="small" show-password></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="confirmPassword">
          <el-input size="small" show-password v-model="passForm.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="btnOk">确认修改</el-button>
          <el-button size="mini" @click="btnCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {updatePassword} from '@/api/user'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      showDialog: false, // 控制弹层的显示和隐藏
      passForm: {
        oldPassword: '', // 旧密码
        newPassword: '', // 新密码
        confirmPassword: '', // 确认密码
      },
      rules: {
        oldPassword: [
          { required: true, message: '旧密码不能为空', trigger: 'blur'},
        ], // 旧密码
        newPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur'},
          { min: 6, max: 16, message: '新密码长度为6-16位之间', trigger: 'blur'}
        ], // 新密码
        confirmPassword: [
          { required: true, message: '重复密码不能为空', trigger: 'blur'},
          { trigger: 'blur', validator: (rule, value, callback) => {
            if(this.passForm.newPassword === value) {
              callback()
            }else {
              callback(new Error('重复密码和新密码不一致'))
            }
          }}
        ], // 确认密码
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      // 引入头像和用户名称
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      // 调用退出登录的action
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    updatePassword() {
      this.showDialog = true
    },
    btnOk() {
      this.$refs.passForm.validate(async isOk => {
        if(isOk){
          // 调用接口
          await updatePassword(this.passForm)
          this.$message.success('修改密码成功')
          // 成功了
          this.btnCancel()
        }
      })
    },
    btnCancel() {
      this.$refs.passForm.resetFields() // 重置表单
      // 关闭弹层
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        /* position: relative; */
        display: flex;
        align-items: center;
        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .username {
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background-color: #04c9be;
          color: #fff;
          border-radius: 50%;
        }
        .name {
          margin-right: 10px;
          margin-left: 5px;
          font-size: 16px;
        }

        .el-icon-setting {
          cursor: pointer;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
