<template>
  <div
    :class="['zth-breadcrumb', { 'zth-breadcrumb-first': first }]"
    :style="{ display: block ? 'block' : '' }"
    @click="clickHandle"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { useDark } from '@/hooks'
import { RouteLocationRaw, useRouter } from 'vue-router'
const { isDark } = useDark()
const router = useRouter()

type bType = {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  to?: RouteLocationRaw
  first?: boolean
  block?: boolean
}
const props = withDefaults(defineProps<bType>(), { type: 'primary', first: false, block: false })
enum lightColors {
  primary = '#E3F2FD',
  success = '#E8F5E9',
  warning = '#FFF3E0',
  danger = '#FFEBEE',
  default = '#f0f2f5',
}
enum darkColors {
  primary = '#1565C0',
  success = '#43A047',
  warning = '#EF6C00',
  danger = '#E53935',
  default = '#1e1e1e',
}
const colors = computed(() => {
  return isDark.value ? darkColors : lightColors
})
const clickHandle = () => {
  if (props.to) {
    router.push(props.to)
  }
}
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>
<style lang="scss">
.zth-breadcrumb {
  display: inline-block;
  position: relative;
  text-align: center;
  padding: 3px 0 3px 8px;
  min-width: 110px;
  line-height: 20px;
  font-size: 14px;
  background: v-bind('colors[props.type]');
  white-space: nowrap;
  overflow: visible;
  color: var(--el-text-color-regular);
  margin-right: 10px;
  cursor: pointer;
  &:before,
  &:after {
    content: ' ';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 13px 0 13px 10px;
    border-color: transparent transparent transparent var(--background);
    position: absolute;
    left: 0;
    top: 0;
  }
  &:before {
    border-left-color: var(--content-background);
    z-index: 1;
  }
  &:after {
    left: auto;
    right: -10px;
    border-left-color: v-bind('colors[props.type]');
    z-index: 2;
  }
}
.zth-breadcrumb-first {
  border-left: 2px solid var(--color-primary);
  &::before {
    content: '';
    border-left-color: v-bind('colors[props.type]');
  }
}
</style>
