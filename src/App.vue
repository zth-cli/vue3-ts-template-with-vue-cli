<script setup lang="ts">
import { useThemeStore } from '@/store2/theme'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const locale = zhCn
console.log('hello script setup')
const theme = useThemeStore()
theme.setTheme('blue')
console.log(theme.colorList)
</script>

<template>
  <el-config-provider :locale="locale" :z-index="2000">
    <router-view />
  </el-config-provider>
</template>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100vh;
  .content {
    height: 100%;
    width: 100%;
  }
}
</style>
