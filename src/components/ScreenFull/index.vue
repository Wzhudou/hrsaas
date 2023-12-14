<template>
  <!-- 因为要布局，所以变成块元素 -->
  <div>
    <svg-icon icon-class="fullscreen" style=" width: 20px; height: 20px" @click="changeScreen" />
  </div>
</template>

<script>
import ScreenFull from 'screenfull'
export default {
  name: 'ScreenFullComp',
  methods: {
    // 改变屏幕
    changeScreen() {
      // document.documentElement.requestFullscreen() // 原生方式全屏
      if(!ScreenFull.isEnabled) {
        this.$message.warning('当前全屏功能不可用')
        return
      }
      // 直接全屏 和退出全屏
      ScreenFull.toggle()
    }
  },
}
</script>

<style lang="scss" scoped>
.svg-icon {
  cursor: pointer;
}
</style>
