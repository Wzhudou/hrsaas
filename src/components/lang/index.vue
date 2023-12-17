<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <!-- 显示图标 -->
    <div>
      <svg-icon style="color:#1bb9dc;font-size:20px" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="$i18n.locale === 'zh'" command="zh">中文</el-dropdown-item>
      <el-dropdown-item :disabled="$i18n.locale === 'en'" command="en">EN</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookies from 'js-cookie' // 引入cookies的工具

export default {
  name: 'Lang',
  methods: {
    changeLanguage(type) {
      // 设置类型 先写入到Cookies
      Cookies.set('language', type) // 写入缓存
      // 改变当前的多语言
      this.$i18n.locale = type // 将当前的多语言类型改成对应的类型
      this.$message.success('切换多语言成功')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
